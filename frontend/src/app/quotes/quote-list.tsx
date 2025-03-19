"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui";
import { ListPageHeader } from "@/components/list-page-header";
import { useQuotes } from "@/hooks/api-hooks";

export function QuoteList() {
  const { data: quotes = [], isLoading, error } = useQuotes();

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
        <p className="text-red-500">Error loading customers: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <ListPageHeader title="Quotes" />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Quote ID</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Items Requested</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Created At</TableHeader>
            <TableHeader>Updated At</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {quotes.map((quote) => (
            <TableRow key={quote.id} href={`/quotes/${quote.id}`} title={quote.customer.name}>
              <TableCell>{quote.readableId}</TableCell>
              <TableCell>{quote.customer.name}</TableCell>
              <TableCell>{quote.items.length}</TableCell>
              <TableCell>{quote.status}</TableCell>
              <TableCell>{quote.createdAt}</TableCell>
              <TableCell>{quote.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
