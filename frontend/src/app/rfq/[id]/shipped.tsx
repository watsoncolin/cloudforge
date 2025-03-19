"use client";

import { PurchaseOrderDto } from "@/api/generated";
import { Button, Dialog, DialogActions, DialogDescription, DialogTitle } from "@/components/catalyst-ui";
import { useState } from "react";
import { useMarkShippedPurchaseOrder } from "@/hooks/api-hooks";

interface MarkShippedPurchaseOrderProps {
  purchaseOrder: PurchaseOrderDto;
}

export function MarkShippedPurchaseOrder({ purchaseOrder }: MarkShippedPurchaseOrderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: markShippedPurchaseOrder } = useMarkShippedPurchaseOrder();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    markShippedPurchaseOrder(purchaseOrder.id, {
      onSuccess: () => {
        setIsOpen(false);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Mark Shipped
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Mark Shipped</DialogTitle>
          <DialogDescription>Mark the purchase order as shipped.</DialogDescription>

          <DialogActions>
            <Button plain type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Marking as shipped..." : "Mark as shipped"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
