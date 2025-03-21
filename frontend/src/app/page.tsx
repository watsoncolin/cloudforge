import {
  Heading,
  Select,
  Subheading,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/catalyst-ui";
import { Stat } from "@/components/catalyst-ui/stat";

export default async function Home() {
  return (
    <>
      <Heading>Good afternoon, Colin</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="RFQ received" value="125" change="+4.5%" />
        <Stat title="Orders processed" value="100" change="+21.2%" />
      </div>
      <Subheading className="mt-14">Recent orders</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            {/* <TableHeader>Event</TableHeader> */}
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {orders.map((order) => (
            <TableRow key={order.orderId} href={`/orders/${order.orderId}`} title={`Order #${order.orderId}`}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell className="text-zinc-500">{order.orderDate}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell className="text-right">USD {order.totalPrice}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </>
  );
}
