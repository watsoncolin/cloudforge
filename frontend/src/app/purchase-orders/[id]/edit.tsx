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
import { useState, useEffect } from "react";
import { Supplier } from "@/domain/supplier";

interface SupplierFormData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  country: string;
  stateProvince: string;
  zipCode: string;
  paymentTerms: string;
  currency: string;
  leadTime: string;
  moq: string;
  shippingMethod: string;
  materials: string;
}

function supplierToFormData(supplier: Supplier): SupplierFormData {
  return {
    companyName: supplier.name,
    contactName: supplier.contact_name,
    contactEmail: supplier.contact_email,
    contactPhone: supplier.contact_phone,
    address: supplier.address,
    city: supplier.city,
    country: supplier.country,
    stateProvince: supplier.state,
    zipCode: supplier.zip_code,
    paymentTerms: supplier.payment_terms,
    currency: supplier.default_currency,
    leadTime: supplier.lead_time_days.toString(),
    moq: supplier.minimum_order_quantity.toString(),
    shippingMethod: supplier.preferred_shipping_method,
    materials: supplier.materials_supplied.join(", "),
  };
}

interface EditSupplierProps {
  supplier: Supplier;
}

export function EditSupplier({ supplier }: EditSupplierProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<SupplierFormData>(supplierToFormData(supplier));
  const [errors, setErrors] = useState<Partial<SupplierFormData>>({});
  const countries = getCountries();

  // Reset form when supplier changes
  useEffect(() => {
    setFormData(supplierToFormData(supplier));
    setErrors({});
  }, [supplier]);

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
    if (!formData.paymentTerms) newErrors.paymentTerms = "Payment terms are required";
    if (!formData.currency) newErrors.currency = "Currency is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`/api/suppliers/${supplier.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.companyName,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          address: formData.address,
          city: formData.city,
          state: formData.stateProvince,
          zip_code: formData.zipCode,
          country: formData.country,
          payment_terms: formData.paymentTerms,
          default_currency: formData.currency,
          lead_time_days: parseInt(formData.leadTime),
          minimum_order_quantity: parseInt(formData.moq),
          preferred_shipping_method: formData.shippingMethod,
          materials_supplied: formData.materials.split(",").map((m) => m.trim()),
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
        Edit Supplier
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit Supplier</DialogTitle>
          <DialogDescription>Update the supplier&apos;s information.</DialogDescription>
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
                  name="zipCode"
                  type="text"
                  placeholder="Enter ZIP/postal code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <Label>Payment Terms</Label>
                <Select name="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange}>
                  <option value="" disabled>
                    Select terms...
                  </option>
                  <option value="Net 15">Net 15</option>
                  <option value="Net 30">Net 30</option>
                  <option value="Net 45">Net 45</option>
                  <option value="Net 60">Net 60</option>
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
            <Button plain type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
