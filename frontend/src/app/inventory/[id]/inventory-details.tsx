"use client";

import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { ChevronLeftIcon, CubeIcon, ScaleIcon } from "@heroicons/react/20/solid";
import { Link } from "@/components/catalyst-ui/link";
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui";
import { AdjustInventory } from "./adjust-inventory";
import { useInventoryById } from "@/hooks/api-hooks";

export default function InventoryDetails({ id }: { id: string }) {
  const router = useRouter();
  const { data: inventory, isLoading, error } = useInventoryById(id);
  if (!inventory) {
    notFound();
  }

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

  if (!inventory) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Inventory not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/inventory" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Inventory
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>
            {inventory.materialType.charAt(0).toUpperCase() + inventory.materialType.slice(1)} {inventory.grade}{" "}
            {inventory.dimensions.thickness} x {inventory.dimensions.width} x {inventory.dimensions.length}
          </Heading>
          <Badge
            color={
              inventory.reorderStatus == "Good" ? "lime" : inventory.reorderStatus == "Low Stock" ? "amber" : "red"
            }
          >
            Reorder Status: {inventory.reorderStatus}
          </Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <ScaleIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{inventory.unitOfMeasure}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CubeIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>
                {inventory.dimensions.thickness} x {inventory.dimensions.width} x {inventory.dimensions.length}
              </span>
            </span>
          </div>
          <div className="flex gap-4">
            <AdjustInventory inventory={inventory}>Adjust Inventory</AdjustInventory>
            <Button>Reorder</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Stock Details</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Total Stock</DescriptionTerm>
          <DescriptionDetails>{inventory.totalQuantity}</DescriptionDetails>
          <DescriptionTerm>Available Stock</DescriptionTerm>
          <DescriptionDetails>{inventory.availableQuantity}</DescriptionDetails>
          <DescriptionTerm>Allocated Stock</DescriptionTerm>
          <DescriptionDetails>{inventory.allocatedQuantity}</DescriptionDetails>
        </DescriptionList>
      </div>
      <div className="mt-12">
        <Subheading>Details </Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Material Type</DescriptionTerm>
          <DescriptionDetails>
            {inventory.materialType.charAt(0).toUpperCase() + inventory.materialType.slice(1)}
          </DescriptionDetails>
          <DescriptionTerm>Grade</DescriptionTerm>
          <DescriptionDetails>{inventory.grade}</DescriptionDetails>
          <DescriptionTerm>Dimensions</DescriptionTerm>
          <DescriptionDetails>
            {inventory.dimensions.thickness} x {inventory.dimensions.width} x {inventory.dimensions.length}
          </DescriptionDetails>
          <DescriptionTerm>Unit of Measure</DescriptionTerm>
          <DescriptionDetails>{inventory.unitOfMeasure}</DescriptionDetails>
          <DescriptionTerm>Reorder Status</DescriptionTerm>
          <DescriptionDetails>{inventory.reorderStatus}</DescriptionDetails>
        </DescriptionList>
      </div>

      <div className="mt-12">
        <Subheading>Batches</Subheading>
        <Divider className="mt-4" />
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Batch Number</TableHeader>
              <TableHeader>Total Stock</TableHeader>
              <TableHeader>Available Stock</TableHeader>
              <TableHeader>Allocated Stock</TableHeader>
              <TableHeader>Received At</TableHeader>
              <TableHeader>Location</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.batches.map((batch) => (
              <TableRow key={batch.id} onClick={() => router.push(`/inventory/${id}/batch/${batch.id}`)}>
                <TableCell>{batch.batchNumber}</TableCell>
                <TableCell>{batch.totalQuantity}</TableCell>
                <TableCell>{batch.availableQuantity}</TableCell>
                <TableCell>{batch.allocatedQuantity}</TableCell>
                <TableCell>{new Date(batch.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  Warehouse: {batch.location.warehouse} Zone: {batch.location.zone} Bin: {batch.location.bin}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
