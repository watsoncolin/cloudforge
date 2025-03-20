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
import { queryKeys, useCreatePurchaseOrder, useSuppliers } from "@/hooks/api-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { PurchaseOrderItemDto, CreatePurchaseOrderDto } from "@/api/generated";

interface PurchaseOrderFormData {
  supplierId: string;
  orderDate: string;
  status: CreatePurchaseOrderDto.status;
  items: PurchaseOrderItemDto[];
  totalPrice: number;
  currency: string;
  expectedDeliveryDate: string;
}

interface FormErrors {
  supplierId?: string;
  orderDate?: string;
  status?: string;
  currency?: string;
  expectedDeliveryDate?: string;
  items?: string;
}

const initialFormData: PurchaseOrderFormData = {
  supplierId: "",
  orderDate: new Date().toISOString().split("T")[0],
  status: CreatePurchaseOrderDto.status.PENDING_APPROVAL,
  items: [
    {
      id: crypto.randomUUID(),
      materialType: PurchaseOrderItemDto.materialType.STEEL,
      grade: "1008",
      dimensions: {
        thickness: 0.1,
        width: 0.1,
        length: 0.1,
      },
      quantity: 1,
      unitOfMeasure: PurchaseOrderItemDto.unitOfMeasure.LBS,
      unitPrice: 100,
      totalPrice: 100,
    },
  ],
  totalPrice: 0,
  currency: "USD",
  expectedDeliveryDate: new Date().toISOString().split("T")[0],
};

export function AddPurchaseOrder() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<PurchaseOrderFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const queryClient = useQueryClient();
  const { data: suppliers } = useSuppliers();

  const {
    mutate: createPurchaseOrder,
    isPending,
    error: mutationError,
  } = useCreatePurchaseOrder({
    onSuccess: () => {
      setFormData(initialFormData);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: queryKeys.purchaseOrders.all });
    },
    onError: (error) => {
      console.error("Error creating purchase order:", error);
    },
  });

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.supplierId) newErrors.supplierId = "Supplier ID is required";
    if (!formData.orderDate) newErrors.orderDate = "Order date is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.currency) newErrors.currency = "Currency is required";
    if (!formData.expectedDeliveryDate) newErrors.expectedDeliveryDate = "Expected delivery date is required";
    if (formData.items.length === 0) newErrors.items = "At least one item is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const purchaseOrderData = {
      supplierId: formData.supplierId,
      orderDate: formData.orderDate,
      status: formData.status,
      items: formData.items.map((item) => ({
        id: item.id,
        materialType: item.materialType,
        grade: item.grade,
        dimensions: item.dimensions,
        quantity: item.quantity,
        unitOfMeasure: item.unitOfMeasure,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })),
      currency: formData.currency,
      expectedDeliveryDate: formData.expectedDeliveryDate,
    };

    createPurchaseOrder(purchaseOrderData);
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
        Add Purchase Order
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} size="5xl">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add New Purchase Order</DialogTitle>
          <DialogDescription>Enter the details of the new purchase order.</DialogDescription>
          {mutationError && (
            <div className="mb-4 p-4 text-sm text-red-500 bg-red-50 rounded-lg">
              Error creating purchase order: {mutationError.message}
            </div>
          )}
          <DialogBody>
            <FieldGroup>
              <Field>
                <Label>Supplier</Label>
                <Select name="supplierId" value={formData.supplierId} onChange={handleInputChange}>
                  <option value="">Select supplier...</option>
                  {suppliers?.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.readableId} - {supplier.name}
                    </option>
                  ))}
                </Select>
                {renderError("supplierId")}
              </Field>

              <Field>
                <Label>Order Date</Label>
                <Input name="orderDate" type="date" value={formData.orderDate} onChange={handleInputChange} />
                {renderError("orderDate")}
              </Field>

              <Field>
                <Label>Status</Label>
                <Select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="">Select status...</option>
                  {Object.values(CreatePurchaseOrderDto.status).map((status) => (
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
                        <TableHeader>
                          <div>Dimensions</div>
                          <div className="flex gap-2">
                            <div className="text-xs flex-1">Thickness</div>
                            <div className="text-xs flex-1">Width</div>
                            <div className="text-xs flex-1">Length</div>
                          </div>
                        </TableHeader>
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
                                  materialType: e.target.value as PurchaseOrderItemDto.materialType,
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  items: newItems,
                                }));
                              }}
                            >
                              <option value="">Select material...</option>
                              {Object.values(PurchaseOrderItemDto.materialType).map((material) => (
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
                                  step="0.0001"
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
                                  step="0.0001"
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
                                  step="0.0001"
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
                              min="0"
                              step="0.0001"
                              value={item.quantity}
                              onChange={(e) => {
                                const newItems = [...formData.items];
                                const quantity = Number(e.target.value);
                                newItems[index] = {
                                  ...newItems[index],
                                  quantity,
                                  totalPrice: quantity * newItems[index].unitPrice,
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
                                  unitOfMeasure: e.target.value as PurchaseOrderItemDto.unitOfMeasure,
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  items: newItems,
                                }));
                              }}
                            >
                              <option value="">Select unit...</option>
                              {Object.values(PurchaseOrderItemDto.unitOfMeasure).map((unit) => (
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
                            id: crypto.randomUUID(),
                            materialType: "" as PurchaseOrderItemDto.materialType,
                            grade: "",
                            dimensions: {
                              thickness: 0,
                              width: 0,
                              length: 0,
                            },
                            quantity: 0,
                            unitOfMeasure: "" as PurchaseOrderItemDto.unitOfMeasure,
                            unitPrice: 0,
                            totalPrice: 0,
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

              <Field>
                <Label>Currency</Label>
                <Select name="currency" value={formData.currency} onChange={handleInputChange}>
                  <option value="">Select currency...</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </Select>
                {renderError("currency")}
              </Field>

              <Field>
                <Label>Expected Delivery Date</Label>
                <Input
                  name="expectedDeliveryDate"
                  type="date"
                  value={formData.expectedDeliveryDate}
                  onChange={handleInputChange}
                />
                {renderError("expectedDeliveryDate")}
              </Field>
            </FieldGroup>
          </DialogBody>
          <DialogActions>
            <Button plain type="button" onClick={() => setIsOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Purchase Order"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
