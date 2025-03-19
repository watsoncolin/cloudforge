"use client";

import { notFound } from "next/navigation";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, CubeIcon, ScaleIcon } from "@heroicons/react/20/solid";
import { Link } from "@/components/catalyst-ui/link";
import { useInventoryById, useInventoryBatchById } from "@/hooks/api-hooks";
import { MoveInventory } from "./move-inventory";

export default function BatchDetails({ id, batchId }: { id: string; batchId: string }) {
  const { data: inventory, isLoading, error } = useInventoryById(id);
  const { data: batch, isLoading: batchLoading, error: batchError } = useInventoryBatchById(id, batchId);
  if (!inventory || !batch) {
    notFound();
  }

  if (isLoading || batchLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error || batchError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error loading inventory: {error?.message || batchError?.message}</p>
      </div>
    );
  }

  if (!inventory || !batch) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Batch not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href={`/inventory/${id}`}
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Inventory {inventory.materialType} {inventory.grade} {inventory.dimensions.thickness}x
          {inventory.dimensions.width}x{inventory.dimensions.length}
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>
            {inventory.materialType.charAt(0).toUpperCase() + inventory.materialType.slice(1)} {inventory.grade}{" "}
            {inventory.dimensions.thickness} x {inventory.dimensions.width} x {inventory.dimensions.length}
          </Heading>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BuildingOfficeIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>
                Warehouse: {batch.batch.location.warehouse} Zone:{batch.batch.location.zone} Bin:
                {batch.batch.location.bin}
              </span>
            </span>
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
            <MoveInventory batch={batch.batch} inventoryId={id}>
              Move Inventory
            </MoveInventory>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Batch Details</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Batch Number</DescriptionTerm>
          <DescriptionDetails>{batch.batch.batchNumber}</DescriptionDetails>
          <DescriptionTerm>Heat Number</DescriptionTerm>
          <DescriptionDetails>{batch.batch.heatNumber}</DescriptionDetails>
          <DescriptionTerm>Mill Certification</DescriptionTerm>
          <DescriptionDetails>{batch.batch.millCertification}</DescriptionDetails>
          <DescriptionTerm>Created At</DescriptionTerm>
          <DescriptionDetails>{batch.batch.createdAt}</DescriptionDetails>
          <DescriptionTerm>Total Stock</DescriptionTerm>
          <DescriptionDetails>{batch.batch.totalQuantity}</DescriptionDetails>
          <DescriptionTerm>Available Stock</DescriptionTerm>
          <DescriptionDetails>{batch.batch.availableQuantity}</DescriptionDetails>
          <DescriptionTerm>Allocated Stock</DescriptionTerm>
          <DescriptionDetails>{batch.batch.allocatedQuantity}</DescriptionDetails>
        </DescriptionList>
      </div>
    </>
  );
}
