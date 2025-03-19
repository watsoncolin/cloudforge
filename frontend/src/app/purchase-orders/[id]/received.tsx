"use client";

import { PurchaseOrderItemDto, ReceivePurchaseOrderDto } from "@/api/generated";
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
import { useReceivePurchaseOrder } from "@/hooks/api-hooks";

const warehouseLocations = [
  { id: "1", name: "Warehouse 1", zones: ["Zone 1", "Zone 2", "Zone 3"], bins: ["Bin 1", "Bin 2", "Bin 3"] },
  { id: "2", name: "Warehouse 2", zones: ["Zone 1", "Zone 2", "Zone 3"], bins: ["Bin 1", "Bin 2", "Bin 3"] },
  { id: "3", name: "Warehouse 3", zones: ["Zone 1", "Zone 2", "Zone 3"], bins: ["Bin 1", "Bin 2", "Bin 3"] },
];

interface ReceivedPurchaseOrderProps {
  item: PurchaseOrderItemDto;
}

interface ReceivePurchaseOrderFormData {
  warehouse: string;
  zone: string;
  bin: string;
  heatNumber: string;
  millCertUrl: string;
  batchNumber: string;
}

export function ReceivedPurchaseOrder({ item }: ReceivedPurchaseOrderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ReceivePurchaseOrderFormData>({
    warehouse: "1",
    zone: "1",
    bin: "1",
    heatNumber: "1234567890",
    millCertUrl: "https://example.com/mill-cert",
    batchNumber: "batch-number",
  });
  const { mutate: receivePurchaseOrder } = useReceivePurchaseOrder();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    const requestDto: ReceivePurchaseOrderDto = {
      purchaseOrderItemId: item.id,
      batchNumber: formData.batchNumber,
      warehouseLocation: {
        id: formData.warehouse,
        name: formData.warehouse,
        zone: formData.zone,
        bin: formData.bin,
      },
      heatNumber: formData.heatNumber,
      millCertUrl: formData.millCertUrl,
    };

    receivePurchaseOrder(
      {
        id: item.id,
        data: requestDto,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setIsSubmitting(false);
        },
      }
    );
  };
  const validateForm = () => {
    const errors: Partial<ReceivePurchaseOrderFormData> = {};
    if (!formData.warehouse) errors.warehouse = "Warehouse is required";
    if (!formData.zone) errors.zone = "Zone is required";
    if (!formData.bin) errors.bin = "Bin is required";
    return errors;
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Mark Received
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Mark Received</DialogTitle>
          <DialogDescription>
            Mark the purchase order as received. This will update the purchase order status to <strong>Received</strong>
            .
          </DialogDescription>
          <DialogDescription>
            Ensure that the items have been received and the quality is satisfactory before marking as received. A new
            batch will be created for each item and added to the inventory.
          </DialogDescription>
          <DialogDescription>
            The heat number and mill cert url are optional, but recommended to be filled out.
          </DialogDescription>
          <DialogBody>
            <FieldGroup>
              <Field>
                <Label>Warehouse</Label>
                <Select
                  value={formData.warehouse}
                  onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                >
                  <option value="">Select a warehouse</option>
                  {warehouseLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field>
                <Label>Zone</Label>
                {formData.warehouse && (
                  <Select value={formData.zone} onChange={(e) => setFormData({ ...formData, zone: e.target.value })}>
                    <option value="">Select a zone</option>
                    {warehouseLocations
                      .find((location) => location.id === formData.warehouse)
                      ?.zones.map((zone) => (
                        <option key={zone} value={zone}>
                          {zone}
                        </option>
                      ))}
                  </Select>
                )}
              </Field>
              <Field>
                <Label>Bin</Label>
                {formData.warehouse && formData.zone && (
                  <Select value={formData.bin} onChange={(e) => setFormData({ ...formData, bin: e.target.value })}>
                    <option value="">Select a bin</option>
                    {warehouseLocations
                      .find((location) => location.id === formData.warehouse)
                      ?.bins.map((bin) => (
                        <option key={bin} value={bin}>
                          {bin}
                        </option>
                      ))}
                  </Select>
                )}
              </Field>
              <Field>
                <Label>Heat Number</Label>
                <Input
                  type="text"
                  value={formData.heatNumber}
                  onChange={(e) => setFormData({ ...formData, heatNumber: e.target.value })}
                />
              </Field>
              <Field>
                <Label>Mill Cert URL</Label>
                <Input
                  type="text"
                  value={formData.millCertUrl}
                  onChange={(e) => setFormData({ ...formData, millCertUrl: e.target.value })}
                />
              </Field>
            </FieldGroup>
          </DialogBody>
          <DialogActions>
            <Button plain type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating inventory..." : "Mark as received"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
