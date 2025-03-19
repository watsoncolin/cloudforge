"use client";

import { Button, Dialog, DialogActions, DialogDescription, DialogTitle } from "@/components/catalyst-ui";
import { useState } from "react";
import { QuoteDto } from "@/api/generated";

interface ConvertToOrderProps {
  quote: QuoteDto;
}

export function ConvertToOrder({ quote }: ConvertToOrderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: convertToOrder } = useConvertToOrder();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    convertToOrder(quote.id, {
      onSuccess: () => {
        setIsOpen(false);
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error(error);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        {isSubmitting ? "Converting..." : "Convert to Order"}
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Convert to Order</DialogTitle>
          <DialogDescription>Convert the quote to an order.</DialogDescription>

          <DialogActions>
            <Button plain type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Converting..." : "Convert"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
