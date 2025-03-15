import { getCustomers, getInvoices, getQuotes, getRFQs, getSalesOrders } from "@/data";
import {
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/components/catalyst-ui/link";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui/table";
import { Table } from "@/components/catalyst-ui/table";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const customer = getCustomers().find((c) => c.id === params.id);

  return {
    title: customer ? `Customer: ${customer.name}` : "Customer Not Found",
  };
}

export default function Customer({ params }: { params: { id: string } }) {
  const customer = getCustomers().find((c) => c.id === params.id);
  const orders = getSalesOrders().filter((o) => o.customer.id === params.id);
  const quotes = getQuotes().filter((q) => q.customer.id === params.id);
  const invoices = getInvoices().filter((i) => i.customer.id === params.id);
  const rfqs = getRFQs().filter((r) => r.customer.id === params.id);
  if (!customer) {
    notFound();
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/customers" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Customers
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{customer.name}</Heading>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BuildingOfficeIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>
                {customer.address.city}, {customer.address.country}
              </span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CurrencyDollarIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{customer.address.postalCode}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <TruckIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{customer.contact.phone}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Contact Information</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Contact Name</DescriptionTerm>
          <DescriptionDetails>{customer.contact.name}</DescriptionDetails>

          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`mailto:${customer.contact.email}`} className="flex items-center gap-2">
              <EnvelopeIcon className="size-4" />
              {customer.contact.email}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Phone</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`tel:${customer.contact.phone}`} className="flex items-center gap-2">
              <PhoneIcon className="size-4" />
              {customer.contact.phone}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Address</DescriptionTerm>
          <DescriptionDetails>
            {customer.address.street}
            <br />
            {customer.address.city}, {customer.address.province} {customer.address.postalCode}
            <br />
            {customer.address.country}
          </DescriptionDetails>
        </DescriptionList>
      </div>
      <div className="mt-12">
        <Subheading>Orders</Subheading>
        <Divider className="mt-4" />
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Order ID</TableHeader>
              <TableHeader>Order Date</TableHeader>
              <TableHeader>Total</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId} href={`/orders/${order.orderId}`}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-12">
        <Subheading>Quotes</Subheading>
        <Divider className="mt-4" />
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Quote ID</TableHeader>
              <TableHeader>Quote Date</TableHeader>
              <TableHeader>Total</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.quoteId} href={`/quotes/${quote.quoteId}`}>
                <TableCell>{quote.quoteId}</TableCell>
                <TableCell>{quote.quoteDate}</TableCell>
                <TableCell>{quote.totalPrice}</TableCell>
                <TableCell>{quote.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-12">
        <Subheading>Invoices</Subheading>
        <Divider className="mt-4" />
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Invoice ID</TableHeader>
              <TableHeader>Invoice Date</TableHeader>
              <TableHeader>Total</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoiceId} href={`/invoices/${invoice.invoiceId}`}>
                <TableCell>{invoice.invoiceId}</TableCell>
                <TableCell>{invoice.invoiceDate}</TableCell>
                <TableCell>{invoice.totalPrice}</TableCell>
                <TableCell>{invoice.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-12">
        <Subheading>RFQs</Subheading>
        <Divider className="mt-4" />
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHead>
            <TableRow>
              <TableHeader>RFQ ID</TableHeader>
              <TableHeader>RFQ Date</TableHeader>
              <TableHeader>Items Requested</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rfqs.map((rfq) => (
              <TableRow key={rfq.rfqId} href={`/rfq/${rfq.rfqId}`}>
                <TableCell>{rfq.rfqId}</TableCell>
                <TableCell>{rfq.receivedDate}</TableCell>
                <TableCell>{rfq.itemsRequested}</TableCell>
                <TableCell>{rfq.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
