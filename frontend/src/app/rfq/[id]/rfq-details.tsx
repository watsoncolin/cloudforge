"use client";

import { BuildingOfficeIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "@/components/catalyst-ui/link";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { useRFQById, useCustomer } from "@/hooks/api-hooks";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/catalyst-ui/table";
import { Button } from "@/components/catalyst-ui/button";
import { Badge } from "@/components/catalyst-ui/badge";
import { RFQDto, RFQItemDto } from "@/api/generated";
import { EditRFQ } from "./edit";
import { ConvertToQuote } from "./convert-to-quote";

export function RFQDetails({ id }: { id: string }) {
  const { data: rfq, isLoading, error } = useRFQById(id);
  const { data: customer, isLoading: customerLoading, error: customerError } = useCustomer(rfq?.customerId ?? "");

  if (isLoading || customerLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error || customerError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error loading request for quote: {error?.message ?? customerError?.message}</p>
      </div>
    );
  }

  if (!rfq) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Request for Quote not found</p>
      </div>
    );
  }
  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/rfq" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Request for Quotes
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{rfq.readableId}</Heading>
          <Badge>{rfq.status}</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BuildingOfficeIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{customer?.name}</span>
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          {rfq.status === RFQDto.status.PENDING && <ConvertToQuote rfq={rfq} />}
          {rfq.status === RFQDto.status.PENDING && <EditRFQ id={id} />}
          {rfq.status === RFQDto.status.PENDING && <Button>Delete</Button>}
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Contact Information</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Contact Name</DescriptionTerm>
          <DescriptionDetails>{customer?.contact.name}</DescriptionDetails>

          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`mailto:${customer?.contact.email}`} className="flex items-center gap-2">
              <EnvelopeIcon className="size-4" />
              {customer?.contact.email}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Phone</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`tel:${customer?.contact.phone}`} className="flex items-center gap-2">
              <PhoneIcon className="size-4" />
              {customer?.contact.phone}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Address</DescriptionTerm>
          <DescriptionDetails>
            {customer?.address.street}
            <br />
            {customer?.address.city}, {customer?.address.stateProvince} {customer?.address.postalCode}
            <br />
            {customer?.address.country}
          </DescriptionDetails>
        </DescriptionList>

        <Subheading>Items</Subheading>
        <Divider className="mt-4" />
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Material</TableHeader>
              <TableHeader>Grade</TableHeader>
              <TableHeader>Width</TableHeader>
              <TableHeader>Length</TableHeader>
              <TableHeader>Thickness</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Unit</TableHeader>
              <TableHeader>Unit Price</TableHeader>
              <TableHeader>Total Price</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rfq.items.map((item: RFQItemDto) => (
              <TableRow key={item.id}>
                <TableCell>{item.materialType}</TableCell>
                <TableCell>{item.grade}</TableCell>
                <TableCell>{item.dimensions.width}</TableCell>
                <TableCell>{item.dimensions.length}</TableCell>
                <TableCell>{item.dimensions.thickness}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unitOfMeasure}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
