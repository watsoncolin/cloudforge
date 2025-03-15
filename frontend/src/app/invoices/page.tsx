import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table, Button } from "@/components/catalyst-ui";
import { getInvoices } from "@/data";
import type { Metadata } from "next";
import { ListPageHeader } from "@/components/list-page-header";

const AddInvoice = () => {
  return <Button>Add Invoice</Button>;
};

export const metadata: Metadata = {
  title: "Invoices",
};

export default function Invoices() {
  const invoices = getInvoices();

  return (
    <>
      <ListPageHeader title="Invoices" button={<AddInvoice />} />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Invoice ID</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Source</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoiceId} href={`/invoices/${invoice.invoiceId}`} title={invoice.customer.name}>
              <TableCell>{invoice.invoiceId}</TableCell>
              <TableCell>{invoice.customer.name}</TableCell>
              <TableCell>{invoice.orderId}</TableCell>
              <TableCell>{invoice.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
