import { getInventoryItem } from "@/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, CubeIcon, ScaleIcon } from "@heroicons/react/20/solid";
import { Link } from "@/components/catalyst-ui/link";
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui";
import { AdjustInventory } from "./adjust-inventory";
import { MoveInventory } from "./move-inventory";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const inventory = await getInventoryItem(parseInt(params.id));

  return {
    title: inventory && `Inventory #${inventory.id}`,
  };
}

export default async function Inventory({ params }: { params: { id: string } }) {
  const inventory = await getInventoryItem(parseInt(params.id));

  if (!inventory) {
    notFound();
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
              <BuildingOfficeIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>
                {inventory.warehouseLocation.warehouse} {inventory.warehouseLocation.zone}{" "}
                {inventory.warehouseLocation.bin}
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
            <AdjustInventory inventory={inventory}>Adjust Inventory</AdjustInventory>
            <MoveInventory inventory={inventory}>Move Inventory</MoveInventory>
            <Button>Reorder</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Stock Details</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Total Stock</DescriptionTerm>
          <DescriptionDetails>
            {inventory.totalStock} {inventory.unitOfMeasure}
          </DescriptionDetails>
          <DescriptionTerm>Available Stock</DescriptionTerm>
          <DescriptionDetails>
            {inventory.availableStock} {inventory.unitOfMeasure}
          </DescriptionDetails>
          <DescriptionTerm>Allocated Stock</DescriptionTerm>
          <DescriptionDetails>
            {inventory.allocatedStock} {inventory.unitOfMeasure}
          </DescriptionDetails>
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
        <Subheading>Location</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Warehouse</DescriptionTerm>
          <DescriptionDetails>{inventory.warehouseLocation.warehouse}</DescriptionDetails>
          <DescriptionTerm>Zone</DescriptionTerm>
          <DescriptionDetails>{inventory.warehouseLocation.zone}</DescriptionDetails>
          <DescriptionTerm>Bin</DescriptionTerm>
          <DescriptionDetails>{inventory.warehouseLocation.bin}</DescriptionDetails>
        </DescriptionList>
      </div>

      <div className="mt-12">
        <Subheading>Batches</Subheading>
        <Divider className="mt-4" />
        {inventory.batches.map((batch) => (
          <Table key={batch.id} className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
            <TableHead>
              <TableRow>
                <TableHeader>Batch Number</TableHeader>
                <TableHeader>Heat Number</TableHeader>
                <TableHeader>Mill Certification</TableHeader>
                <TableHeader>Created At</TableHeader>
                <TableHeader>Total Stock</TableHeader>
                <TableHeader>Available Stock</TableHeader>
                <TableHeader>Allocated Stock</TableHeader>
                <TableHeader>Quality Issues</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{batch.batchNumber}</TableCell>
                <TableCell>{batch.heatNumber}</TableCell>
                <TableCell>{batch.millCertification}</TableCell>
                <TableCell>{batch.createdAt}</TableCell>
                <TableCell>{batch.totalStock}</TableCell>
                <TableCell>{batch.availableStock}</TableCell>
                <TableCell>{batch.allocatedStock}</TableCell>
                <TableCell>{batch.qualityIssues ? "Yes" : "No"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </div>
    </>
  );
}
