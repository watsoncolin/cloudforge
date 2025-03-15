import { notFound } from "next/navigation";
import type { Quote, QuoteItem } from "@/domain/quote";
import { getQuote } from "@/data";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { Button } from "@/components/catalyst-ui/button";
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from "@/components/catalyst-ui/table";
import { ChevronLeftIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/catalyst-ui/badge";
import Link from "next/link";
import { DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { DescriptionTerm } from "@/components/catalyst-ui/description-list";
import { DescriptionList } from "@/components/catalyst-ui/description-list";

export default async function Quote({ params }: { params: { id: string } }) {
  const quote = await getQuote(params.id);

  if (!quote) {
    notFound();
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/quotes" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Quotes
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>
            {quote.id}
            {quote.items.length > 1 && ` (${quote.items.length} items)`}
          </Heading>
          <Badge color={quote.status == "Pending Approval" ? "blue" : quote.status == "Approved" ? "green" : undefined}>
            Status: {quote.status}
          </Badge>
        </div>
      </div>

      <div className="mt-12">
        <Subheading>Contact Information</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Contact Name</DescriptionTerm>
          <DescriptionDetails>{quote.customer.name}</DescriptionDetails>

          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`mailto:${quote.customer.contact.email}`} className="flex items-center gap-2">
              <EnvelopeIcon className="size-4" />
              {quote.customer.contact.email}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Phone</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`tel:${quote.customer.contact.phone}`} className="flex items-center gap-2">
              <PhoneIcon className="size-4" />
              {quote.customer.contact.phone}
            </Link>
          </DescriptionDetails>
        </DescriptionList>
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
            {quote.items.map((item: QuoteItem) => (
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
        {quote.status == "Pending Approval" && <Button type="submit">Approve Quote</Button>}
        {quote.status == "Approved" && <Button type="submit">Convert to Order</Button>}
      </div>
    </>
  );
}
