"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui";
import { ListPageHeader } from "@/components/list-page-header";
import { useRFQs } from "@/hooks/api-hooks";
import AddRFQ from "./add-rfq";

export function RFQList() {
  const { data: rfqs = [], isLoading, error } = useRFQs();

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
      <ListPageHeader title="Request for Quotes" searchPlaceholder="Search RFQs&hellip;" button={<AddRFQ />} />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Items Requested</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Source</TableHeader>
            <TableHeader>Created At</TableHeader>
            <TableHeader>Updated At</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rfqs.map((rfq) => (
            <TableRow key={rfq.id} href={`/rfq/${rfq.id}`} title={rfq.customer.name}>
              <TableCell>{rfq.readableId}</TableCell>
              <TableCell>{rfq.customer.name}</TableCell>
              <TableCell>{rfq.items.length}</TableCell>
              <TableCell>{rfq.status}</TableCell>
              <TableCell>{rfq.source}</TableCell>
              <TableCell>{rfq.createdAt}</TableCell>
              <TableCell>{rfq.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
