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
import { useState } from "react";
import { queryKeys, useCreateCustomer } from "@/hooks/api-hooks";
import { CreateCustomerDto } from "@/api/generated";
import { useQueryClient } from "@tanstack/react-query";

interface CustomerFormData {
  name: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  addressStreet: string;
  addressCity: string;
  addressProvince: string;
  addressPostalCode: string;
  addressCountry: string;
  paymentTerm: CreateCustomerDto.paymentTerm;
}

const initialFormData: CustomerFormData = {
  name: "Mock Customer",
  contactName: "Mock Contact",
  contactEmail: "mock@example.com",
  contactPhone: "123-456-7890",
  addressStreet: "123 Main St",
  addressCity: "Anytown",
  addressProvince: "CA",
  addressPostalCode: "12345",
  addressCountry: "United States",
  paymentTerm: CreateCustomerDto.paymentTerm.NET_30,
};

export function AddCustomer() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<CustomerFormData>>({});
  const countries: {
    code: string;
    name: string;
  }[] = [
    {
      code: "US",
      name: "United States",
    },
    {
      code: "CA",
      name: "Canada",
    },
    {
      code: "MX",
      name: "Mexico",
    },
  ];
  const queryClient = useQueryClient();

  const {
    mutate: createCustomer,
    isPending,
    error: mutationError,
  } = useCreateCustomer({
    onSuccess: () => {
      setFormData(initialFormData);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
    },
    onError: (error) => {
      console.error("Error creating customer:", error);
    },
  });

  const validateForm = () => {
    const newErrors: Partial<CustomerFormData> = {};

    // Required fields validation
    if (!formData.name) newErrors.name = "Company name is required";
    if (!formData.contactName) newErrors.contactName = "Contact name is required";
    if (!formData.contactEmail) {
      newErrors.contactEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format";
    }
    if (!formData.addressStreet) newErrors.addressStreet = "Street is required";
    if (!formData.addressCity) newErrors.addressCity = "City is required";
    if (!formData.addressProvince) newErrors.addressProvince = "Province is required";
    if (!formData.addressPostalCode) newErrors.addressPostalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Transform form data to match API DTO
    const customerData: CreateCustomerDto = {
      name: formData.name,
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      address: formData.addressStreet,
      city: formData.addressCity,
      stateProvince: formData.addressProvince,
      postalCode: formData.addressPostalCode,
      country: formData.addressCountry,
      paymentTerm: formData.paymentTerm,
    };

    createCustomer(customerData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof CustomerFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const renderError = (fieldName: keyof CustomerFormData) => {
    const error = errors[fieldName];
    return error ? <span className="text-sm text-red-500 mt-1">{error}</span> : null;
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Add Customer
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} size="2xl">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>Enter the details of the new customer.</DialogDescription>
          {mutationError && (
            <div className="mb-4 p-4 text-sm text-red-500 bg-red-50 rounded-lg">
              Error creating customer: {mutationError.message}
            </div>
          )}
          <DialogBody>
            <FieldGroup>
              <Field>
                <Label>Company Name</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter company name"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoFocus
                />
                {renderError("name")}
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
                  name="addressStreet"
                  type="text"
                  placeholder="Enter street address"
                  value={formData.addressStreet}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>City</Label>
                <Input
                  name="addressCity"
                  type="text"
                  placeholder="Enter city"
                  value={formData.addressCity}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>Country</Label>
                <Select name="addressCountry" value={formData.addressCountry} onChange={handleInputChange}>
                  <option value="" disabled>
                    Select country...
                  </option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </Select>
                {renderError("addressCountry")}
              </Field>

              <Field>
                <Label>State/Province</Label>
                <Input
                  name="addressProvince"
                  type="text"
                  placeholder="Enter state/province"
                  value={formData.addressProvince}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>ZIP/Postal Code</Label>
                <Input
                  name="addressPostalCode"
                  type="text"
                  placeholder="Enter ZIP/postal code"
                  value={formData.addressPostalCode}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>Payment Terms</Label>
                <Select name="paymentTerm" value={formData.paymentTerm} onChange={handleInputChange}>
                  <option value="" disabled>
                    Select payment terms...
                  </option>
                  {Object.values(CreateCustomerDto.paymentTerm).map((term) => (
                    <option key={term} value={term}>
                      {term.replace("_", " ")}
                    </option>
                  ))}
                </Select>
              </Field>
            </FieldGroup>
          </DialogBody>
          <DialogActions>
            <Button plain type="button" onClick={() => setIsOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Customer"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
