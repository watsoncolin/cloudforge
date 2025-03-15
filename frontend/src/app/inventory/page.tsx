"use client";

import { TableCell } from "@/components/catalyst-ui/table";
import { TableBody } from "@/components/catalyst-ui/table";
import { TableRow } from "@/components/catalyst-ui/table";
import { TableHead } from "@/components/catalyst-ui/table";
import { Table } from "@/components/catalyst-ui/table";
import { TableHeader } from "@/components/catalyst-ui/table";
import { Input } from "@/components/catalyst-ui/input";
import { Heading } from "@/components/catalyst-ui/heading";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { InputGroup } from "@/components/catalyst-ui/input";
import { getInventory } from "@/data";
import { Button } from "@/components/catalyst-ui/button";

export default function InventoryPage() {
  const inventory = getInventory();

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>
          Inventory
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search inventory&hellip;" />
              </InputGroup>
            </div>
          </div>
        </Heading>

        <Button>Add Inventory</Button>
      </div>
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Material Type</TableHeader>
            <TableHeader>Grade</TableHeader>
            <TableHeader>Dimensions</TableHeader>
            <TableHeader>Total Stock</TableHeader>
            <TableHeader>Available Stock</TableHeader>
            <TableHeader>Allocated Stock</TableHeader>
            <TableHeader>Reorder Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((inventory) => (
            <TableRow
              key={inventory.id}
              href={`/inventory/${inventory.id}`}
              title={inventory.materialType}
              className={
                inventory.reorderStatus === "Low Stock"
                  ? "bg-amber-50"
                  : inventory.reorderStatus === "Critical"
                  ? "bg-red-50"
                  : ""
              }
            >
              <TableCell>{inventory.id}</TableCell>
              <TableCell>{inventory.materialType}</TableCell>
              <TableCell>{inventory.grade}</TableCell>
              <TableCell>
                {inventory.dimensions.thickness} x {inventory.dimensions.width} x {inventory.dimensions.length}
              </TableCell>
              <TableCell>
                {inventory.totalStock} {inventory.unitOfMeasure}
              </TableCell>
              <TableCell>{inventory.availableStock}</TableCell>
              <TableCell>{inventory.allocatedStock}</TableCell>
              <TableCell>{inventory.reorderStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
