import { getRFQ } from "@/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { BuildingOfficeIcon, CpuChipIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { Link } from "@/components/catalyst-ui/link";
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui";
import { ExtractedDataSection } from "@/components/rfq/ExtractedDataSection";
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const rfq = await getRFQ(params.id);

  return {
    title: rfq && `RFQ #${rfq.rfqId}`,
  };
}

export default async function RFQ({ params }: { params: { id: string } }) {
  const rfq = await getRFQ(params.id);

  if (!rfq) {
    notFound();
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/rfq" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          RFQs
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>
            {rfq.customer.name}
            {rfq.itemsRequested > 1 && ` (${rfq.itemsRequested} items)`}
          </Heading>
          <Badge color={rfq.status == "Pending" ? "blue" : rfq.status == "In Progress" ? "green" : undefined}>
            Status: {rfq.status}
          </Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BuildingOfficeIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{rfq.source}</span>
            </span>
            {rfq.source === "Uploaded" && rfq.extractedData?.fileUrl && (
              <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
                <PaperClipIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                <span>{rfq.extractedData?.fileUrl}</span>
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <Button>
              <Link href={`/quotes/create?rfq=${rfq.rfqId}`}>Convert to Quote</Link>
            </Button>
          </div>
        </div>
      </div>

      {rfq.status === "Pending" && rfq.source === "Uploaded" && rfq.extractedData && (
        <ExtractedDataSection extractedData={rfq.extractedData} />
      )}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <Subheading>Materials</Subheading>
        </div>
        <Divider className="mt-4" />
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Line Item ID</TableHeader>
              <TableHeader>Material Type</TableHeader>
              <TableHeader>Grade</TableHeader>
              <TableHeader>Dimensions</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Unit of Measure</TableHeader>
              <TableHeader>Required Date</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rfq.extractedData?.materials.map((material) => (
              <TableRow key={material.lineItemId} className="bg-blue-200">
                <TableCell>
                  <div className="flex items-center justify-center">
                    <CpuChipIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                  </div>
                </TableCell>
                <TableCell>{material.materialType}</TableCell>
                <TableCell>{material.grade}</TableCell>
                <TableCell>
                  {material.dimensions.thickness} x {material.dimensions.width} x {material.dimensions.length}
                </TableCell>
                <TableCell>{material.quantity}</TableCell>
                <TableCell>{material.unitOfMeasure}</TableCell>
                <TableCell>{material.requiredDate}</TableCell>
                <TableCell>
                  <Button>Accept</Button>
                </TableCell>
              </TableRow>
            ))}
            {rfq.materials.map((material) => (
              <TableRow key={material.lineItemId}>
                <TableCell>{material.lineItemId}</TableCell>
                <TableCell>{material.materialType}</TableCell>
                <TableCell>{material.grade}</TableCell>
                <TableCell>
                  {material.dimensions.thickness} x {material.dimensions.width} x {material.dimensions.length}
                </TableCell>
                <TableCell>{material.quantity}</TableCell>
                <TableCell>{material.unitOfMeasure}</TableCell>
                <TableCell>{material.requiredDate}</TableCell>
                <TableCell>{material.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className="mt-8">Add material</Button>
      </div>
    </>
  );
}
