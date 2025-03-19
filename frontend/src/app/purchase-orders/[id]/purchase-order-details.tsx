"use client";

import {
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  TruckIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "@/components/catalyst-ui/link";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { usePurchaseOrder, useSupplier } from "@/hooks/api-hooks";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/catalyst-ui/table";
import { Button } from "@/components/catalyst-ui/button";
import { PurchaseOrderDto } from "@/api/generated";
import { ApprovePurchaseOrder } from "./approve";
import { MarkShippedPurchaseOrder } from "./shipped";
import { ReceivedPurchaseOrder } from "./received";

export function PurchaseOrderDetails({ id }: { id: string }) {
  const { data: purchaseOrder, isLoading, error } = usePurchaseOrder(id);
  const { data: supplier } = useSupplier(purchaseOrder?.supplierId ?? "");

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
        <p className="text-red-500">Error loading supplier: {error.message}</p>
      </div>
    );
  }

  if (!purchaseOrder) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Purchase order not found</p>
      </div>
    );
  }
  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href="/purchase-orders"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Purchase Orders
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{purchaseOrder.readableId}</Heading>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BuildingOfficeIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{supplier?.name}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CurrencyDollarIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>${purchaseOrder.totalPrice.toFixed(2)}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <TruckIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{purchaseOrder.items.map((item) => item.materialType).join(", ")}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>Expected Delivery: {new Date(purchaseOrder.expectedDeliveryDate).toLocaleDateString()}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <span className="text-zinc-400 dark:text-zinc-500">Status: {purchaseOrder.status}</span>
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          {purchaseOrder.status === PurchaseOrderDto.status.PENDING_APPROVAL && (
            <ApprovePurchaseOrder purchaseOrder={purchaseOrder} />
          )}
          {purchaseOrder.status === PurchaseOrderDto.status.APPROVED && (
            <MarkShippedPurchaseOrder purchaseOrder={purchaseOrder} />
          )}
          {purchaseOrder.status === PurchaseOrderDto.status.PENDING_APPROVAL && <Button>Reject</Button>}
          {purchaseOrder.status === PurchaseOrderDto.status.PENDING_APPROVAL && <Button>Edit</Button>}
          {purchaseOrder.status === PurchaseOrderDto.status.PENDING_APPROVAL && <Button>Cancel</Button>}
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Contact Information</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Contact Name</DescriptionTerm>
          <DescriptionDetails>{supplier?.contact.name}</DescriptionDetails>

          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`mailto:${supplier?.contact.email}`} className="flex items-center gap-2">
              <EnvelopeIcon className="size-4" />
              {supplier?.contact.email}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Phone</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`tel:${supplier?.contact.phone}`} className="flex items-center gap-2">
              <PhoneIcon className="size-4" />
              {supplier?.contact.phone}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Address</DescriptionTerm>
          <DescriptionDetails>
            {supplier?.address.street}
            <br />
            {supplier?.address.city}, {supplier?.address.stateProvince} {supplier?.address.postalCode}
            <br />
            {supplier?.address.country}
          </DescriptionDetails>
        </DescriptionList>

        <Subheading>Items</Subheading>
        <Divider className="mt-4" />
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Item</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Unit Price</TableHeader>
              <TableHeader>Total Price</TableHeader>
              {purchaseOrder.status === PurchaseOrderDto.status.SHIPPED && <TableHeader>Actions</TableHeader>}
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseOrder.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.materialType} {item.grade} {item.dimensions.length}x{item.dimensions.width}x
                  {item.dimensions.thickness}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unitPrice}</TableCell>
                <TableCell>{item.totalPrice}</TableCell>
                {purchaseOrder.status === PurchaseOrderDto.status.SHIPPED && (
                  <TableCell>
                    <ReceivedPurchaseOrder item={item} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
