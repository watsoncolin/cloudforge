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
  Textarea,
} from "@/components/catalyst-ui";
import { ClipboardDocumentListIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  queryKeys,
  useCreateRFQ,
  useCustomers,
  useGenerateAiGeneratedRfqFromText,
  useGenerateAiGeneratedRfqFromFile,
} from "@/hooks/api-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CreateRFQDto, Material, RFQItemDto, RFQDto } from "@/api/generated";

interface RFQFormData {
  customerId: string;
  status: CreateRFQDto.status;
  items: RFQItemDto[];
  totalPrice: number;
  currency: string;
  expectedDeliveryDate: string;
}

interface FormErrors {
  customerId?: string;
  status?: string;
  currency?: string;
  expectedDeliveryDate?: string;
  items?: string;
}

const initialFormData: RFQFormData = {
  customerId: "",
  status: CreateRFQDto.status.PENDING,
  items: [],
  totalPrice: 0,
  currency: "USD",
  expectedDeliveryDate: "",
};

export default function AddRFQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<RFQFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const queryClient = useQueryClient();
  const { data: customers, isLoading: isCustomersLoading } = useCustomers();
  const [aiGeneratedRfq, setAiGeneratedRfq] = useState("");
  const [aiGeneratedRfqResponse, setAiGeneratedRfqResponse] = useState<RFQDto | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const { mutate: generateAiGeneratedRfq, isPending: isGeneratingAiGeneratedRfqFromText } =
    useGenerateAiGeneratedRfqFromText();
  const { isPending: isGeneratingAiGeneratedRfqFromFile } = useGenerateAiGeneratedRfqFromFile();
  const [isAiResponseVisible, setIsAiResponseVisible] = useState(false);

  const handleGenerateAiGeneratedRfq = () => {
    generateAiGeneratedRfq(
      { text: aiGeneratedRfq },
      {
        onSuccess: (data: RFQDto) => {
          setAiGeneratedRfqResponse(data);

          data.items.forEach((item) => {
            formData.items.push({
              id: item.id,
              materialType: item.materialType,
              processingType: item.processingType,
              grade: item.grade,
              dimensions: item.dimensions,
              quantity: item.quantity,
              unitOfMeasure: item.unitOfMeasure,
              price: item.price,
              total: item.total,
            });
          });
        },
      }
    );
  };

  const uploadPDF = async (file: File) => {
    setPdfLoading(true);
    const pdfFormData = new FormData();
    pdfFormData.append("file", file);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/rfqs/generate-quote/file", {
        method: "POST",
        body: pdfFormData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("File uploaded successfully:", result);
      setAiGeneratedRfqResponse(result);
      setPdfLoading(false);
      result.items.forEach((item: RFQItemDto) => {
        formData.items.push({
          id: item.id,
          materialType: item.materialType,
          processingType: item.processingType,
          grade: item.grade,
          dimensions: item.dimensions,
          quantity: item.quantity,
          unitOfMeasure: item.unitOfMeasure,
          price: item.price,
          total: item.total,
        });
      });
      // Clear the file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setAiGeneratedRfqResponse(null);
    }
  };

  const handleGenerateAiGeneratedRfqFromFile = (file: File) => {
    if (!file) return;

    uploadPDF(file);

    // generateAiGeneratedRfqFromFile(
    //   { file },
    //   {
    //     onSuccess: (data: RFQDto) => {
    //       setAiGeneratedRfqResponse(data);
    //       // Clear the file input
    //       const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    //       if (fileInput) {
    //         fileInput.value = "";
    //       }
    //     },
    //     onError: (error) => {
    //       console.error("Error generating AI generated RFQ from file:", error);

    //       // Clear the file input
    //       const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    //       if (fileInput) {
    //         fileInput.value = "";
    //       }
    //     },
    //   }
    // );
  };

  const {
    mutate: createRFQ,
    isPending,
    error: mutationError,
  } = useCreateRFQ({
    onSuccess: () => {
      setFormData(initialFormData);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: queryKeys.rfqs.all });
    },
    onError: (error) => {
      console.error("Error creating RFQ:", error);
    },
  });

  //if loading, show a loading indicator
  if (isCustomersLoading) {
    return <div>Loading...</div>;
  }

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.customerId) newErrors.customerId = "Customer ID is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (formData.items.length === 0) newErrors.items = "At least one item is required";
    if (formData.items.some((item) => !item.materialType)) newErrors.items = "Material type is required";
    if (formData.items.some((item) => !item.processingType)) newErrors.items = "Processing type is required";
    if (formData.items.some((item) => !item.grade)) newErrors.items = "Grade is required";
    if (formData.items.some((item) => !item.dimensions.thickness)) newErrors.items = "Dimensions are required";
    if (formData.items.some((item) => !item.dimensions.width)) newErrors.items = "Dimensions are required";
    if (formData.items.some((item) => !item.dimensions.length)) newErrors.items = "Dimensions are required";
    if (formData.items.some((item) => !item.unitOfMeasure)) newErrors.items = "Unit of measure is required";
    if (formData.items.some((item) => !item.quantity)) newErrors.items = "Quantity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const rfqData = {
      customerId: formData.customerId,
      status: formData.status,
      currency: formData.currency,
      expectedDeliveryDate: formData.expectedDeliveryDate,
      notes: "",
      source: CreateRFQDto.source.MANUAL,
      items: formData.items,
    };

    createRFQ(rfqData);
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
        Add RFQ
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} size="5xl">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add New RFQ</DialogTitle>
          <DialogDescription>Enter the details of the new RFQ.</DialogDescription>
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
                            <Select
                              value={item.processingType}
                              onChange={(e) => {
                                const newItems = [...formData.items];
                                newItems[index] = {
                                  ...newItems[index],
                                  processingType: e.target.value as RFQItemDto.processingType,
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  items: newItems,
                                }));
                              }}
                            >
                              <option value="">Select processing type...</option>
                              {Object.values(RFQItemDto.processingType).map((processingType) => (
                                <option key={processingType} value={processingType}>
                                  {processingType}
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
                              min="1"
                              step="0.0001"
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
                            processingType: RFQItemDto.processingType.HRB,
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
            <FieldGroup>
              <Field>
                <div className="space-y-8 mt-10">
                  <Label>AI Generated RFQ</Label>
                  <div>
                    <Textarea
                      value={aiGeneratedRfq}
                      onChange={(e) => setAiGeneratedRfq(e.target.value)}
                      placeholder="Enter text to generate RFQ from"
                    />
                  </div>

                  <div className="flex mt-10">
                    <Button
                      type="button"
                      onClick={handleGenerateAiGeneratedRfq}
                      disabled={isGeneratingAiGeneratedRfqFromText}
                    >
                      {isGeneratingAiGeneratedRfqFromText ? "Generating..." : "Generate from Text"}
                    </Button>
                  </div>

                  <div>
                    <Label>PDF Upload</Label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleGenerateAiGeneratedRfqFromFile(file);
                        }
                      }}
                      disabled={isGeneratingAiGeneratedRfqFromFile || pdfLoading}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {isGeneratingAiGeneratedRfqFromFile && (
                      <p className="mt-2 text-sm text-gray-500">Processing PDF...</p>
                    )}
                    {pdfLoading && <p className="mt-2 text-sm text-gray-500">Processing PDF...</p>}
                  </div>
                </div>

                {/* add collapsible section for ai generated rfq */}
                <div className="flex mt-10">
                  {aiGeneratedRfqResponse && (
                    <div className="mt-4 w-full">
                      <button
                        onClick={() => setIsAiResponseVisible(!isAiResponseVisible)}
                        className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                      >
                        <span>AI Generated RFQ</span>
                        {isAiResponseVisible ? (
                          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {isAiResponseVisible && (
                        <div className="mt-2 px-4 pb-2">
                          <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
                            {JSON.stringify(aiGeneratedRfqResponse, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Field>
            </FieldGroup>
          </DialogBody>
          <DialogActions>
            <Button plain type="button" onClick={() => setIsOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add RFQ"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
