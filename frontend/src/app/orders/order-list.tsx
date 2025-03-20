"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui";
import { ListPageHeader } from "@/components/list-page-header";
import { useOrders } from "@/hooks/api-hooks";

export function OrderList() {
  const { data: orders = [], isLoading, error } = useOrders();

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
      <ListPageHeader title="Orders" />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order ID</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Items Requested</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Created At</TableHeader>
            <TableHeader>Updated At</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={`/orders/${order.id}`} title={order.customerId}>
              <TableCell>{order.readableId}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.items.length}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>{order.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
