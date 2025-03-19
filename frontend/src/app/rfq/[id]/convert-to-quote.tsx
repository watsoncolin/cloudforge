"use client";

import { Button, Dialog, DialogActions, DialogDescription, DialogTitle } from "@/components/catalyst-ui";
import { useState } from "react";
import { useConvertToQuote } from "@/hooks/api-hooks";
import { RFQDto } from "@/api/generated";

interface ConvertToQuoteProps {
  rfq: RFQDto;
}

export function ConvertToQuote({ rfq }: ConvertToQuoteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: convertToQuote } = useConvertToQuote();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    convertToQuote(rfq.id, {
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
        {isSubmitting ? "Converting..." : "Convert to Quote"}
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Convert to Quote</DialogTitle>
          <DialogDescription>Convert the request for quote to a quote.</DialogDescription>

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
