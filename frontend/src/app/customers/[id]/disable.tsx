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
import { useState, useEffect } from "react";
import { Supplier } from "@/domain/supplier";

interface DisableSupplierFormData {
  reason: string;
}

interface DisableSupplierProps {
  supplier: Supplier;
}

export function DisableSupplier({ supplier }: DisableSupplierProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<DisableSupplierFormData>({
    reason: "",
  });
  const [errors, setErrors] = useState<Partial<DisableSupplierFormData>>({});

  // Reset form when supplier changes
  useEffect(() => {
    setFormData({
      reason: "",
    });
    setErrors({});
  }, [supplier]);

  const validateForm = () => {
    const newErrors: Partial<DisableSupplierFormData> = {};

    // Required fields validation
    if (!formData.reason) newErrors.reason = "Reason is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`/api/suppliers/${supplier.id}/disable`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: formData.reason,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update supplier");
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Error updating supplier:", error);
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
    if (errors[name as keyof DisableSupplierFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const renderError = (fieldName: keyof DisableSupplierFormData) => {
    const error = errors[fieldName];
    return error ? <span className="text-sm text-red-500 mt-1">{error}</span> : null;
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} color="red">
        Disable Supplier
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Disable Supplier</DialogTitle>
          <DialogDescription>Are you sure you want to disable this supplier?</DialogDescription>
          <DialogBody>
            <FieldGroup>
              <Field>
                <Label>Reason</Label>
                <Input
                  name="reason"
                  type="text"
                  placeholder="Enter reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  autoFocus
                />
                {renderError("reason")}
              </Field>
            </FieldGroup>
          </DialogBody>
          <DialogActions>
            <Button plain type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" color="red">
              Disable
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
