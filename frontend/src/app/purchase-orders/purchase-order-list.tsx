"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui";
import { ListPageHeader } from "@/components/list-page-header";
import { usePurchaseOrders, useSuppliers } from "@/hooks/api-hooks";
import { AddPurchaseOrder } from "./add-purchase-order";
import { PurchaseOrderDto } from "@/api/generated";

export function PurchaseOrdersList() {
  const { data: purchaseOrders = [], isLoading, error } = usePurchaseOrders();
  const { data: suppliers = [] } = useSuppliers();

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
        <p className="text-red-500">Error loading suppliers: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <ListPageHeader
        title="Purchase Orders"
        searchPlaceholder="Search purchase orders&hellip;"
        button={<AddPurchaseOrder />}
      />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Contact</TableHeader>
            <TableHeader>Phone</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchaseOrders.map((purchaseOrder: PurchaseOrderDto) => {
            const supplier = suppliers.find((supplier) => supplier.id === purchaseOrder.supplierId);
            return (
              <TableRow key={purchaseOrder.id} href={`/purchase-orders/${purchaseOrder.id}`} title={purchaseOrder.id}>
                <TableCell>{purchaseOrder.id}</TableCell>
                <TableCell>{purchaseOrder.supplierId}</TableCell>
                <TableCell>
                  <span className="line-clamp-1">{supplier?.name}</span>
                </TableCell>
                <TableCell className="text-right">{supplier?.address.street}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
