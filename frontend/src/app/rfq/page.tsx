"use client";

import { TableCell, TableBody, TableRow, TableHead, Table, TableHeader } from "@/components/catalyst-ui";
import { getRFQs } from "@/data";
import { AddRFQ } from "./add-rfq";
import { ListPageHeader } from "@/components/list-page-header";

export default function RFQPage() {
  const rfqs = getRFQs();

  return (
    <>
      <ListPageHeader title="Request for Quotes" searchPlaceholder="Search RFQs&hellip;" button={<AddRFQ />} />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Items Requested</TableHeader>
            <TableHeader>Total Weight</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Source</TableHeader>
            <TableHeader>Created At</TableHeader>
            <TableHeader>Updated At</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rfqs.map((rfq) => (
            <TableRow
              key={rfq.rfqId}
              href={`/rfq/${rfq.rfqId}`}
              title={rfq.customer.name}
              className={rfq.status === "Pending" ? "bg-amber-50" : rfq.status === "In Progress" ? "bg-blue-50" : ""}
            >
              <TableCell>{rfq.rfqId}</TableCell>
              <TableCell>{rfq.customer.name}</TableCell>
              <TableCell>{rfq.itemsRequested}</TableCell>
              <TableCell>{rfq.materials.reduce((acc, material) => acc + material.quantity, 0)}</TableCell>
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
