"use client";

import { useQuoteById } from "@/hooks/api-hooks";
import { QuoteDto } from "@/api/generated";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "@/components/catalyst-ui/link";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { DescriptionTerm } from "@/components/catalyst-ui/description-list";
import { Badge } from "@/components/catalyst-ui/badge";
import { DescriptionList } from "@/components/catalyst-ui/description-list";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/catalyst-ui/table";
import { ConvertToOrder } from "./convert-to-order";

export function QuoteDetails({ id }: { id: string }) {
  const { data: quote, isLoading, error } = useQuoteById(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error loading quote: {error?.message}</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Quote not found</p>
      </div>
    );
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
            {quote.readableId}
            {quote.items.length > 1 && ` (${quote.items.length} items)`}
          </Heading>
          <Badge
            color={
              quote.status == QuoteDto.status.PENDING
                ? "blue"
                : quote.status == QuoteDto.status.APPROVED
                ? "green"
                : undefined
            }
          >
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
              {quote.status == QuoteDto.status.PENDING && <TableHeader>Available Inventory</TableHeader>}
            </TableRow>
          </TableHead>
          <TableBody>
            {quote.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.materialType} {item.grade} {item.dimensions.thickness} x {item.dimensions.width}
                  {item.dimensions.length ? ` x ${item.dimensions.length}` : ""}
                </TableCell>
                <TableCell>
                  {item.quantity} {item.unitOfMeasure}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.total)}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.total)}
                </TableCell>
                {quote.status == QuoteDto.status.PENDING && (
                  <TableCell>{item.quantities?.available ? item.quantities?.available : 0}</TableCell>
                )}
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                  quote.items.reduce((acc, item) => acc ?? 0 + item.total ?? 0, 0)
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <div className="flex justify-end gap-4 mt-20">
        {quote.status == QuoteDto.status.PENDING && <ConvertToOrder quote={quote} />}
      </div>
    </>
  );
}
