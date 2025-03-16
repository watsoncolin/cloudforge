"use client";

import {
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "@/components/catalyst-ui/link";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { usePurchaseOrder, useSupplier } from "@/hooks/api-hooks";

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
        <Link href="/suppliers" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Suppliers
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{purchaseOrder.id}</Heading>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BuildingOfficeIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{purchaseOrder.supplierId}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CurrencyDollarIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{purchaseOrder.currency}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <TruckIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{purchaseOrder.items.map((item) => item.materialType).join(", ")}</span>
            </span>
          </div>
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
      </div>
    </>
  );
}
