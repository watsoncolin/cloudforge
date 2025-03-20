"use client";

import { notFound } from "next/navigation";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "@/components/catalyst-ui/link";
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui";
import { useOrderById, useCustomer } from "@/hooks/api-hooks";

export default function OrderDetails({ id }: { id: string }) {
  const { data: order, isLoading, error } = useOrderById(id);

  if (!order) {
    notFound();
  }

  const { data: customer, isLoading: customerLoading, error: customerError } = useCustomer(order.customerId);

  const total = order.items.reduce((acc, item) => acc + item.total, 0);

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
        <p className="text-red-500">Error loading order: {error?.message}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Order not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/orders" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Orders
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Order #{order.readableId}</Heading>
          <Badge color="lime">Successful</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{total}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{order.createdAt}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <Button>Resend Invoice</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Summary</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Customer</DescriptionTerm>
          <DescriptionDetails>{customer?.name}</DescriptionDetails>
          <DescriptionTerm>Amount</DescriptionTerm>
          <DescriptionDetails>{total}</DescriptionDetails>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>{order.status}</DescriptionDetails>
          <DescriptionTerm>Order Date</DescriptionTerm>
          <DescriptionDetails>{order.createdAt}</DescriptionDetails>
        </DescriptionList>
      </div>
      <div className="mt-12">
        <Subheading>Materials</Subheading>
        <Divider className="mt-4" />
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Material</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Unit Price</TableHeader>
              <TableHeader>Total Price</TableHeader>
              <TableHeader>Batches</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.inventory.materialType} {item.inventory.grade} {item.inventory.dimensions.thickness} x{" "}
                  {item.inventory.dimensions.width} x {item.inventory.dimensions.length} {item.inventory.unitOfMeasure}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.total}</TableCell>
                <TableCell>
                  <div>
                    <div>Location:</div>
                    {item.batches.map((batch) => (
                      <div key={batch.id}>
                        <div>{batch.location.warehouse}</div>
                        <div>{batch.location.zone}</div>
                        <div>{batch.location.bin}</div>
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
