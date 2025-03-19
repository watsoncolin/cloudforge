"use client";

import { PurchaseOrderDto } from "@/api/generated";
import { Button, Dialog, DialogActions, DialogDescription, DialogTitle } from "@/components/catalyst-ui";
import { useState } from "react";
import { useApprovePurchaseOrder } from "@/hooks/api-hooks";

interface ApprovePurchaseOrderProps {
  purchaseOrder: PurchaseOrderDto;
}

export function ApprovePurchaseOrder({ purchaseOrder }: ApprovePurchaseOrderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: approvePurchaseOrder } = useApprovePurchaseOrder();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    approvePurchaseOrder(purchaseOrder.id, {
      onSuccess: () => {
        setIsOpen(false);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Approve
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Approve Purchase Order</DialogTitle>
          <DialogDescription>Approve the purchase order.</DialogDescription>

          <DialogActions>
            <Button plain type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Approving..." : "Approve"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
