"use client";

import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui";
import { ListPageHeader } from "@/components/list-page-header";
import { useInventory } from "@/hooks/api-hooks";
import type { DimensionsDto } from "@/api/generated";
import { AddInventory } from "./[id]/add-inventory";

export function InventoryList() {
  const { data: inventory = [], isLoading, error } = useInventory();

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
        <p className="text-red-500">Error loading inventory: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <ListPageHeader title="Inventory" button={<AddInventory />} />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Material Type</TableHeader>
            <TableHeader>Grade</TableHeader>
            <TableHeader>Dimensions</TableHeader>
            <TableHeader>Total Quantity</TableHeader>
            <TableHeader>Available</TableHeader>
            <TableHeader>Allocated</TableHeader>
            <TableHeader>Reorder Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((item) => {
            const dimensions = item.dimensions as DimensionsDto;
            return (
              <TableRow
                key={item.id}
                href={`/inventory/${item.id}`}
                title={`${item.materialType} ${item.grade} ${dimensions.thickness}x${dimensions.width}x${dimensions.length}`}
              >
                <TableCell>{item.materialType}</TableCell>
                <TableCell>{item.grade}</TableCell>
                <TableCell>
                  {dimensions.thickness} x {dimensions.width}
                  {dimensions.length ? ` x ${dimensions.length}` : ""}
                </TableCell>
                <TableCell>{item.totalQuantity}</TableCell>
                <TableCell>{item.availableQuantity}</TableCell>
                <TableCell>{item.allocatedQuantity}</TableCell>
                <TableCell>
                  <Badge
                    color={item.reorderStatus == "Good" ? "lime" : item.reorderStatus == "Low Stock" ? "amber" : "red"}
                  >
                    {item.reorderStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
