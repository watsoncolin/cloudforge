import { getSuppliers } from "@/data";
import {
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/catalyst-ui/badge";
import { Link } from "@/components/catalyst-ui/link";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { EditSupplier } from "./edit";
import { DisableSupplier } from "./disable";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supplier = getSuppliers().find((s) => s.id === params.id);

  return {
    title: supplier ? `Supplier: ${supplier.name}` : "Supplier Not Found",
  };
}

export default function Supplier({ params }: { params: { id: string } }) {
  const supplier = getSuppliers().find((s) => s.id === params.id);

  if (!supplier) {
    notFound();
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
          <Heading>{supplier.name}</Heading>
          <Badge color={supplier.active_status ? "lime" : "zinc"}>
            {supplier.active_status ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BuildingOfficeIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>
                {supplier.city}, {supplier.country}
              </span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CurrencyDollarIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{supplier.default_currency}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <TruckIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <span>{supplier.preferred_shipping_method}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <EditSupplier supplier={supplier} />
            <DisableSupplier supplier={supplier} />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Contact Information</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Contact Name</DescriptionTerm>
          <DescriptionDetails>{supplier.contact_name}</DescriptionDetails>

          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`mailto:${supplier.contact_email}`} className="flex items-center gap-2">
              <EnvelopeIcon className="size-4" />
              {supplier.contact_email}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Phone</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`tel:${supplier.contact_phone}`} className="flex items-center gap-2">
              <PhoneIcon className="size-4" />
              {supplier.contact_phone}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Address</DescriptionTerm>
          <DescriptionDetails>
            {supplier.address}
            <br />
            {supplier.city}, {supplier.state} {supplier.zip_code}
            <br />
            {supplier.country}
          </DescriptionDetails>
        </DescriptionList>
      </div>
      <div className="mt-12">
        <Subheading>Supply Information</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Materials Supplied</DescriptionTerm>
          <DescriptionDetails>
            <ul className="list-inside list-disc">
              {supplier.materials_supplied.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </DescriptionDetails>

          <DescriptionTerm>Payment Terms</DescriptionTerm>
          <DescriptionDetails>{supplier.payment_terms}</DescriptionDetails>

          <DescriptionTerm>Lead Time</DescriptionTerm>
          <DescriptionDetails>{supplier.lead_time_days} days</DescriptionDetails>

          <DescriptionTerm>Minimum Order Quantity</DescriptionTerm>
          <DescriptionDetails>{supplier.minimum_order_quantity.toLocaleString()} units</DescriptionDetails>

          <DescriptionTerm>Rating</DescriptionTerm>
          <DescriptionDetails>
            <span className="flex items-center gap-2">
              {supplier.rating} / 5
              <Badge color={supplier.rating >= 4.5 ? "lime" : supplier.rating >= 4 ? "amber" : "red"}>
                {supplier.rating >= 4.5 ? "Excellent" : supplier.rating >= 4 ? "Good" : "Poor"}
              </Badge>
            </span>
          </DescriptionDetails>

          <DescriptionTerm>Supplier Since</DescriptionTerm>
          <DescriptionDetails>
            {new Date(supplier.created_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </DescriptionDetails>
        </DescriptionList>
      </div>
    </>
  );
}
