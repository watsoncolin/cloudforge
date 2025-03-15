import { notFound } from "next/navigation";
import type { Invoice, InvoiceItem } from "@/domain/invoice";
import { getInvoice } from "@/data";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { Button } from "@/components/catalyst-ui/button";
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from "@/components/catalyst-ui/table";
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/catalyst-ui/badge";
import Link from "next/link";
import { DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { DescriptionTerm } from "@/components/catalyst-ui/description-list";
import { DescriptionList } from "@/components/catalyst-ui/description-list";

export default async function Invoice({ params }: { params: { id: string } }) {
  const invoice = await getInvoice(params.id);

  if (!invoice) {
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
          <Heading>{invoice.invoiceId}</Heading>
          <Badge color={invoice.status == "Pending" ? "blue" : invoice.status == "Paid" ? "green" : undefined}>
            Status: {invoice.status}
          </Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>
                {new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(
                  invoice.totalPrice
                )}
              </span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(invoice.invoiceDate))}
              </span>
            </span>
          </div>
          <div className="flex gap-4">
            <Button>Resend Invoice</Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Subheading>Contact Information</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Contact Name</DescriptionTerm>
          <DescriptionDetails>{invoice.customer.name}</DescriptionDetails>

          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`mailto:${invoice.customer.contact.email}`} className="flex items-center gap-2">
              <EnvelopeIcon className="size-4" />
              {invoice.customer.contact.email}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Phone</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`tel:${invoice.customer.contact.phone}`} className="flex items-center gap-2">
              <PhoneIcon className="size-4" />
              {invoice.customer.contact.phone}
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
            {invoice.items.map((item: InvoiceItem) => (
              <TableRow key={item.lineItemId}>
                <TableCell>
                  {item.materialType} {item.grade} {item.dimensions.thickness} x {item.dimensions.width}
                  {item.dimensions.length ? ` x ${item.dimensions.length}` : ""}
                </TableCell>
                <TableCell>
                  {item.quantity} {item.unitOfMeasure}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(
                    item.unitPrice
                  )}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(
                    item.totalPrice
                  )}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                <span>
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(
                    invoice.totalPrice
                  )}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <div className="mt-12 flex justify-end gap-4">
        {invoice.status == "Pending" && <Button type="submit">Record Payment</Button>}
        {invoice.status == "Paid" && <Button type="submit">View Payment</Button>}
      </div>
    </>
  );
}
