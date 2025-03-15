import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table, Button } from "@/components/catalyst-ui";
import { getQuotes } from "@/data";
import type { Metadata } from "next";
import { ListPageHeader } from "@/components/list-page-header";

export const metadata: Metadata = {
  title: "Quotes",
};

const AddQuote = () => {
  return <Button>Add Quote</Button>;
};

export default function Quotes() {
  const quotes = getQuotes();

  return (
    <>
      <ListPageHeader title="Quotes" button={<AddQuote />} />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Quote ID</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Source</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {quotes.map((quote) => (
            <TableRow key={quote.id} href={`/quotes/${quote.id}`} title={quote.customer.name}>
              <TableCell>{quote.id}</TableCell>
              <TableCell>{quote.customer.name}</TableCell>
              <TableCell>{quote.rfqId ? "RFQ" : "Manual"}</TableCell>
              <TableCell>{quote.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
