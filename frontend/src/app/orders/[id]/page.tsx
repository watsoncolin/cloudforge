import { getSalesOrder } from "@/data";
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/catalyst-ui/badge";
import { Link } from "@/components/catalyst-ui/link";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { Button } from "@/components/catalyst-ui/button";
import { Table, TableHead, TableRow, TableCell, TableHeader, TableBody } from "@/components/catalyst-ui/table";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const order = await getSalesOrder(params.id);

  return {
    title: order && `Order #${order.orderId}`,
  };
}

export default async function Order({ params }: { params: { id: string } }) {
  const order = await getSalesOrder(params.id);

  if (!order) {
    notFound();
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
          <Heading>Order #{order.orderId}</Heading>
          <Badge color="lime">Successful</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{order.totalPrice}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{order.orderDate}</span>
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
          <DescriptionDetails>
            {order.customer.name} {order.customer.contactName}
          </DescriptionDetails>
          <DescriptionTerm>Amount</DescriptionTerm>
          <DescriptionDetails>{order.totalPrice}</DescriptionDetails>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>{order.status}</DescriptionDetails>
          <DescriptionTerm>Order Date</DescriptionTerm>
          <DescriptionDetails>{order.orderDate}</DescriptionDetails>
          <DescriptionTerm>Tracking Number</DescriptionTerm>
          <DescriptionDetails>{order.trackingNumber}</DescriptionDetails>
          <DescriptionTerm>Shipping Date</DescriptionTerm>
          <DescriptionDetails>{order.shippingDate}</DescriptionDetails>
          <DescriptionTerm>Delivery Date</DescriptionTerm>
          <DescriptionDetails>{order.deliveryDate}</DescriptionDetails>
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
              <TableRow key={item.lineItemId}>
                <TableCell>
                  {item.materialType} {item.grade} {item.dimensions.thickness} x {item.dimensions.width}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.basePrice}</TableCell>
                <TableCell>{item.totalPrice}</TableCell>
                <TableCell>
                  {item.allocatedBatches.map((batch) => (
                    <div key={batch.batchId}>
                      {batch.batchId} - {batch.allocatedQuantity} qty
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
