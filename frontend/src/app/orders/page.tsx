import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table, Badge, Button } from "@/components/catalyst-ui";
import { getSalesOrders } from "@/data";
import type { Metadata } from "next";
import { ListPageHeader } from "@/components/list-page-header";

export const metadata: Metadata = {
  title: "Orders",
};

const AddOrder = () => {
  return <Button>Add Order</Button>;
};

export default async function Orders() {
  const orders = await getSalesOrders();

  return (
    <>
      <ListPageHeader title="Orders" button={<AddOrder />} />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderId} href={`/orders/${order.orderId}`} title={`Order #${order.orderId}`}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell className="text-zinc-500">{order.orderDate}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <Badge color={order.status == "Pending" ? "blue" : order.status == "Processing" ? "green" : undefined}>
                  {order.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
