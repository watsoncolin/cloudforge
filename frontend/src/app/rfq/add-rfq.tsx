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
} from "@/components/catalyst-ui";
import { useState } from "react";

interface RFQFormData {
  customer: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
}

const initialFormData: RFQFormData = {
  customer: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  address: "",
  city: "",
};

export function AddRFQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<RFQFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<RFQFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<RFQFormData> = {};

    // Required fields validation
    if (!formData.customer) newErrors.customer = "Customer is required";
    if (!formData.contactName) newErrors.contactName = "Contact name is required";
    if (!formData.contactEmail) {
      newErrors.contactEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create supplier");
      }

      // Reset form and close modal on success
      setFormData(initialFormData);
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating supplier:", error);
      // Handle error (you might want to show an error message to the user)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof RFQFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const renderError = (fieldName: keyof RFQFormData) => {
    const error = errors[fieldName];
    return error ? <span className="text-sm text-red-500 mt-1">{error}</span> : null;
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Add RFQ
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} size="2xl">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add New RFQ</DialogTitle>
          <DialogDescription>Enter the details of the new RFQ.</DialogDescription>
          <DialogBody>
            <FieldGroup>
              <Field>
                <Label>Customer</Label>
                <Input
                  name="customer"
                  type="text"
                  placeholder="Enter customer name"
                  value={formData.customer}
                  onChange={handleInputChange}
                  autoFocus
                />
                {renderError("customer")}
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
            </FieldGroup>
          </DialogBody>
          <DialogActions>
            <Button plain type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add RFQ</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
