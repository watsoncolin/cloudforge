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
} from "@/components/catalyst-ui";
import { getCountries } from "@/data";
import { queryKeys } from "@/hooks/api-hooks";
import { useCreateSupplier } from "@/hooks/api-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CreateSupplierDto } from "@/api/generated";

interface SupplierFormData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  country: string;
  stateProvince: string;
  postalCode: string;
  paymentTerms: CreateSupplierDto.paymentTerms;
  currency: string;
  leadTime: string;
  moq: string;
  shippingMethod: string;
  materials: string;
}

const initialFormData: SupplierFormData = {
  companyName: "Mock Company",
  contactName: "Mock Contact",
  contactEmail: "mock@example.com",
  contactPhone: "1234567890",
  address: "123 Mock Street",
  city: "Mock City",
  country: "United States",
  stateProvince: "Mock State",
  postalCode: "12345",
  paymentTerms: CreateSupplierDto.paymentTerms.NET_30,
  currency: "USD",
  leadTime: "10",
  moq: "100",
  shippingMethod: "Ocean Freight",
  materials: "Steel, Aluminum, Copper",
};

export function AddSupplier() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<SupplierFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<SupplierFormData>>({});
  const countries = getCountries();
  const queryClient = useQueryClient();

  const {
    mutate: createSupplier,
    isPending,
    error: mutationError,
  } = useCreateSupplier({
    onSuccess: () => {
      setFormData(initialFormData);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: queryKeys.suppliers.all });
    },
    onError: (error) => {
      console.error("Error creating supplier:", error);
    },
  });

  const validateForm = () => {
    const newErrors: Partial<SupplierFormData> = {};

    // Required fields validation
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.contactName) newErrors.contactName = "Contact name is required";
    if (!formData.contactEmail) {
      newErrors.contactEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format";
    }
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.paymentTerms) newErrors.paymentTerms = undefined;
    if (!formData.currency) newErrors.currency = "Currency is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Transform form data to match API DTO
    const supplierData: CreateSupplierDto = {
      name: formData.companyName,
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      address: formData.address,
      city: formData.city,
      stateProvince: formData.stateProvince,
      postalCode: formData.postalCode,
      country: formData.country,
      paymentTerms: formData.paymentTerms as CreateSupplierDto.paymentTerms,
    };

    createSupplier(supplierData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof SupplierFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const renderError = (fieldName: keyof SupplierFormData) => {
    const error = errors[fieldName];
    return error ? <span className="text-sm text-red-500 mt-1">{error}</span> : null;
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Add Supplier
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} size="2xl">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add New Supplier</DialogTitle>
          <DialogDescription>Enter the details of the new supplier.</DialogDescription>
          {mutationError && (
            <div className="mb-4 p-4 text-sm text-red-500 bg-red-50 rounded-lg">
              Error creating supplier: {mutationError.message}
            </div>
          )}
          <DialogBody>
            <FieldGroup>
              <Field>
                <Label>Company Name</Label>
                <Input
                  name="companyName"
                  type="text"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  autoFocus
                />
                {renderError("companyName")}
              </Field>

              <Field>
                <Label>Contact Name</Label>
                <Input
                  name="contactName"
                  type="text"
                  placeholder="Enter contact name"
                  value={formData.contactName}
                  onChange={handleInputChange}
                />
                {renderError("contactName")}
              </Field>

              <Field>
                <Label>Contact Email</Label>
                <Input
                  name="contactEmail"
                  type="email"
                  placeholder="Enter contact email"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                />
                {renderError("contactEmail")}
              </Field>

              <Field>
                <Label>Contact Phone</Label>
                <Input
                  name="contactPhone"
                  type="tel"
                  placeholder="Enter contact phone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>Address</Label>
                <Input
                  name="address"
                  type="text"
                  placeholder="Enter street address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>City</Label>
                <Input
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>Country</Label>
                <Select name="country" value={formData.country} onChange={handleInputChange}>
                  <option value="" disabled>
                    Select country...
                  </option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </Select>
                {renderError("country")}
              </Field>

              <Field>
                <Label>State/Province</Label>
                <Input
                  name="stateProvince"
                  type="text"
                  placeholder="Enter state/province"
                  value={formData.stateProvince}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>ZIP/Postal Code</Label>
                <Input
                  name="postalCode"
                  type="text"
                  placeholder="Enter ZIP/postal code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>Payment Terms</Label>
                <Select name="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange}>
                  <option value="" disabled>
                    Select terms...
                  </option>
                  {Object.values(CreateSupplierDto.paymentTerms).map((term) => (
                    <option key={term} value={term}>
                      {term.replace("_", " ")}
                    </option>
                  ))}
                </Select>
                {renderError("paymentTerms")}
              </Field>

              <Field>
                <Label>Currency</Label>
                <Select name="currency" value={formData.currency} onChange={handleInputChange}>
                  <option value="" disabled>
                    Select currency...
                  </option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                </Select>
                {renderError("currency")}
              </Field>

              <Field>
                <Label>Lead Time (Days)</Label>
                <Input
                  name="leadTime"
                  type="number"
                  min="1"
                  placeholder="Enter lead time"
                  value={formData.leadTime}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>Minimum Order Quantity</Label>
                <Input
                  name="moq"
                  type="number"
                  min="1"
                  placeholder="Enter MOQ"
                  value={formData.moq}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>Shipping Method</Label>
                <Select name="shippingMethod" value={formData.shippingMethod} onChange={handleInputChange}>
                  <option value="" disabled>
                    Select shipping method...
                  </option>
                  <option value="Ocean Freight">Ocean Freight</option>
                  <option value="Air Freight">Air Freight</option>
                  <option value="Road Freight">Road Freight</option>
                  <option value="Rail Freight">Rail Freight</option>
                  <option value="LTL Freight">LTL Freight</option>
                </Select>
              </Field>

              <Field>
                <Label>Materials Supplied</Label>
                <Input
                  name="materials"
                  type="text"
                  placeholder="Enter materials (comma-separated)"
                  value={formData.materials}
                  onChange={handleInputChange}
                />
                <span className="mt-1 text-xs text-zinc-500">
                  Enter materials separated by commas (e.g., Steel Plates, Hot Rolled Steel)
                </span>
              </Field>
            </FieldGroup>
          </DialogBody>
          <DialogActions>
            <Button plain type="button" onClick={() => setIsOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Supplier"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
