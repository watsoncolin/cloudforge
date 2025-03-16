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
import { useCustomer } from "@/hooks/api-hooks";

export function CustomerDetails({ id }: { id: string }) {
  const { data: customer, isLoading, error } = useCustomer(id);

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
        <p className="text-red-500">Error loading customer: {error.message}</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Customer not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/customers" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Customers
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{customer.name}</Heading>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BuildingOfficeIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>
                {customer.address.city}, {customer.address.country}
              </span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CurrencyDollarIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{customer.address.postalCode}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <TruckIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{customer.contact.phone}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Contact Information</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Contact Name</DescriptionTerm>
          <DescriptionDetails>{customer.contact.name}</DescriptionDetails>

          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`mailto:${customer.contact.email}`} className="flex items-center gap-2">
              <EnvelopeIcon className="size-4" />
              {customer.contact.email}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Phone</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`tel:${customer.contact.phone}`} className="flex items-center gap-2">
              <PhoneIcon className="size-4" />
              {customer.contact.phone}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Address</DescriptionTerm>
          <DescriptionDetails>
            {customer.address.street}
            <br />
            {customer.address.city}, {customer.address.stateProvince} {customer.address.postalCode}
            <br />
            {customer.address.country}
          </DescriptionDetails>
        </DescriptionList>
      </div>
      {/* TODO: Add Orders, Quotes, Invoices, and RFQs sections once those APIs are available */}
    </>
  );
}
