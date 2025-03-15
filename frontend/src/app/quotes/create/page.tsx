"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { RFQ } from "@/domain/rfq";
import { calculateMaterialPrice, getRFQ } from "@/data";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { Button } from "@/components/catalyst-ui/button";
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from "@/components/catalyst-ui/table";
import { Quote, QuoteItem } from "@/domain/quote";

const defaultQuote: Quote = {
  id: "QUOTE-123",
  customer: {
    id: "CUSTOMER-123",
    name: "John Doe",
    contactName: "John Doe",
    contactEmail: "john.doe@example.com",
    contactPhone: "123-456-7890",
  },
  items: [],
  subtotal: 0,
  taxRate: 0,
  taxAmount: 0,
  totalPrice: 0,
  currency: "USD",
  notes: "",
  createdAt: new Date().toISOString(),
  quoteDate: new Date().toISOString(),
  expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  status: "Draft",
};

export default function CreateQuote() {
  const searchParams = useSearchParams();
  const rfqId = searchParams.get("rfq");
  const [rfq, setRfq] = useState<RFQ | null>(null);
  const [quote, setQuote] = useState<Quote>(defaultQuote);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRFQ() {
      if (!rfqId) {
        console.log("No RFQ ID provided");
        return;
      }

      console.log("Loading RFQ with ID:", rfqId);
      setLoading(true);
      try {
        const rfqData = await getRFQ(rfqId);
        console.log("Loaded RFQ data:", rfqData);
        if (rfqData) {
          setRfq(rfqData);
          const newItems: QuoteItem[] = rfqData.materials.map((material) => {
            const price = calculateMaterialPrice(
              material.materialType,
              material.grade,
              material.dimensions.thickness,
              material.dimensions.width,
              material.quantity,
              material.unitOfMeasure,
              material.dimensions.length
            );

            return {
              lineItemId: material.lineItemId,
              materialType: material.materialType,
              grade: material.grade,
              dimensions: material.dimensions,
              quantity: material.quantity,
              unitOfMeasure: material.unitOfMeasure,
              basePrice: price,
              finalPrice: price,
              totalPrice: price * material.quantity,
              stockAvailability: "Available" as const,
            };
          });

          const totalPrice = newItems.reduce((acc, item) => acc + item.totalPrice, 0);

          setQuote((prev) => ({
            ...prev,
            rfqId: rfqId,
            customer: rfqData.customer,
            items: newItems,
            totalPrice: totalPrice,
          }));
        }
      } catch (error) {
        console.error("Failed to load RFQ:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRFQ();
  }, [rfqId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form method="post" className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <Heading>{rfq ? `Create Quote from #${rfq.rfqId}` : "Create Quote"}</Heading>
        {
          rfq && <div className="text-sm text-gray-500">Customer: {rfq.customer.name}</div>

          /* TODO: Add a dropdown for customers */
        }
      </div>
      <Divider className="my-10 mt-6" />

      <section className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <Subheading>Material Details</Subheading>
        </div>
      </section>
      <section>
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Material</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Unit Price</TableHeader>
              <TableHeader>Total Price</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {quote.items.map((item) => (
              <TableRow key={item.lineItemId}>
                <TableCell>
                  {item.materialType} {item.grade} {item.dimensions.thickness} x {item.dimensions.width}
                  {item.dimensions.length ? ` x ${item.dimensions.length}` : ""}
                </TableCell>
                <TableCell>
                  {item.quantity} {item.unitOfMeasure}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: quote.currency }).format(
                    item.finalPrice
                  )}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: quote.currency }).format(
                    item.totalPrice
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>
                <Button plain>+ Add Material</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("en-US", { style: "currency", currency: quote.currency }).format(
                  quote.totalPrice
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="reset" plain>
          Reset
        </Button>
        <Button type="submit">Create Quote</Button>
      </div>
    </form>
  );
}
