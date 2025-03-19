"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  Field,
  FieldGroup,
  Input,
  Label,
  Select,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
  InputGroup,
} from "@/components/catalyst-ui";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { queryKeys, useCustomers, useRFQById, useUpdateRFQ } from "@/hooks/api-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CreateRFQDto, Material, RFQItemDto, UpdateRFQDto, UpdateRFQItemDto } from "@/api/generated";

interface RFQFormData {
  customerId: string;
  status: CreateRFQDto.status;
  items: RFQItemDto[];
}

interface FormErrors {
  customerId?: string;
  status?: string;
  items?: string;
}

const initialFormData: RFQFormData = {
  customerId: "",
  status: CreateRFQDto.status.PENDING,
  items: [],
};

export function EditRFQ({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<RFQFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const queryClient = useQueryClient();
  const { data: customers, isLoading: isCustomersLoading } = useCustomers();
  const { data: rfq, isLoading: isRfqLoading } = useRFQById(id);

  useEffect(() => {
    if (rfq) {
      setFormData({
        customerId: rfq.customerId,
        status: rfq.status,
        items: rfq.items.map((item: RFQItemDto) => ({
          ...item,
          dimensions: {
            thickness: item.dimensions.thickness,
            width: item.dimensions.width,
            length: item.dimensions.length,
          },
        })),
      });
    }
  }, [rfq]);

  const {
    mutate: updateRFQ,
    isPending,
    error: mutationError,
  } = useUpdateRFQ({
    onSuccess: () => {
      setFormData(initialFormData);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: queryKeys.rfqs.all });
    },
    onError: (error) => {
      console.error("Error updating RFQ:", error);
    },
  });

  //if loading, show a loading indicator
  if (isCustomersLoading || isRfqLoading) {
    return <div>Loading...</div>;
  }

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.customerId) newErrors.customerId = "Customer ID is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (formData.items.length === 0) newErrors.items = "At least one item is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const rfqData: UpdateRFQDto = {
      id: id,
      customerId: formData.customerId,
      notes: "",
      status: formData.status,
      items: formData.items.map((item) => ({
        id: item.id,
        materialType: item.materialType as UpdateRFQItemDto.materialType,
        grade: item.grade,
        dimensions: item.dimensions,
        quantity: item.quantity,
        unitOfMeasure: item.unitOfMeasure,
        price: item.price,
        total: item.total,
      })),
    };

    updateRFQ({ id, data: rfqData });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const renderError = (fieldName: keyof FormErrors) => {
    const error = errors[fieldName];
    return error ? <span className="text-sm text-red-500 mt-1">{error}</span> : null;
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
        Edit RFQ
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} size="5xl">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit RFQ</DialogTitle>
          <DialogDescription>Edit the details of the RFQ.</DialogDescription>
          {mutationError && (
            <div className="mb-4 p-4 text-sm text-red-500 bg-red-50 rounded-lg">
              Error creating RFQ: {mutationError.message}
            </div>
          )}
          <DialogBody>
            <FieldGroup>
              <Field>
                <Label>Customer</Label>
                <Select name="customerId" value={formData.customerId} onChange={handleInputChange}>
                  <option value="">Select customer...</option>
                  {customers?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.readableId} - {customer.name}
                    </option>
                  ))}
                </Select>
                {renderError("customerId")}
              </Field>
              <Field>
                <Label>Status</Label>
                <Select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="">Select status...</option>
                  {Object.values(CreateRFQDto.status).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
                {renderError("status")}
              </Field>

              <Field>
                <Label>Items</Label>
                <div className="space-y-4">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeader>Material</TableHeader>
                        <TableHeader>Grade</TableHeader>
                        <TableHeader>Dimensions</TableHeader>
                        <TableHeader>Quantity</TableHeader>
                        <TableHeader>Unit</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Select
                              value={item.materialType}
                              onChange={(e) => {
                                const newItems = [...formData.items];
                                newItems[index] = {
                                  ...newItems[index],
                                  materialType: e.target.value as Material,
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  items: newItems,
                                }));
                              }}
                            >
                              <option value="">Select material...</option>
                              {Object.values(Material).map((material) => (
                                <option key={material} value={material}>
                                  {material}
                                </option>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              value={item.grade}
                              onChange={(e) => {
                                const newItems = [...formData.items];
                                newItems[index] = {
                                  ...newItems[index],
                                  grade: e.target.value,
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  items: newItems,
                                }));
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <InputGroup>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  placeholder="T"
                                  value={item.dimensions.thickness}
                                  onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index] = {
                                      ...newItems[index],
                                      dimensions: {
                                        ...newItems[index].dimensions,
                                        thickness: Number(e.target.value),
                                      },
                                    };
                                    setFormData((prev) => ({
                                      ...prev,
                                      items: newItems,
                                    }));
                                  }}
                                />
                              </InputGroup>
                              <InputGroup>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  placeholder="W"
                                  value={item.dimensions.width}
                                  onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index] = {
                                      ...newItems[index],
                                      dimensions: {
                                        ...newItems[index].dimensions,
                                        width: Number(e.target.value),
                                      },
                                    };
                                    setFormData((prev) => ({
                                      ...prev,
                                      items: newItems,
                                    }));
                                  }}
                                />
                              </InputGroup>
                              <InputGroup>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  placeholder="L"
                                  value={item.dimensions.length}
                                  onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index] = {
                                      ...newItems[index],
                                      dimensions: {
                                        ...newItems[index].dimensions,
                                        length: Number(e.target.value),
                                      },
                                    };
                                    setFormData((prev) => ({
                                      ...prev,
                                      items: newItems,
                                    }));
                                  }}
                                />
                              </InputGroup>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              step="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const newItems = [...formData.items];
                                const quantity = Number(e.target.value);
                                newItems[index] = {
                                  ...newItems[index],
                                  quantity,
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  items: newItems,
                                }));
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={item.unitOfMeasure}
                              onChange={(e) => {
                                const newItems = [...formData.items];
                                newItems[index] = {
                                  ...newItems[index],
                                  unitOfMeasure: e.target.value as RFQItemDto.unitOfMeasure,
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  items: newItems,
                                }));
                              }}
                            >
                              <option value="">Select unit...</option>
                              {Object.values(RFQItemDto.unitOfMeasure).map((unit) => (
                                <option key={unit} value={unit}>
                                  {unit}
                                </option>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button
                              plain
                              onClick={() => {
                                const newItems = formData.items.filter((_, i) => i !== index);
                                setFormData((prev) => ({
                                  ...prev,
                                  items: newItems,
                                }));
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button
                    type="button"
                    plain
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        items: [
                          ...prev.items,
                          {
                            id: "",
                            materialType: Material.STEEL,
                            grade: "",
                            dimensions: {
                              thickness: 0,
                              width: 0,
                              length: 0,
                            },
                            quantity: 0,
                            unitOfMeasure: RFQItemDto.unitOfMeasure.LBS,
                            price: 0,
                            total: 0,
                          },
                        ],
                      }));
                    }}
                  >
                    Add Item
                  </Button>
                </div>
                {errors.items && <span className="text-sm text-red-500 mt-1">{errors.items}</span>}
              </Field>
            </FieldGroup>
          </DialogBody>
          <DialogActions>
            <Button plain type="button" onClick={() => setIsOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Editing..." : "Edit RFQ"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
