import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table, Button } from "@/components/catalyst-ui";
import { getCustomers } from "@/data";
import type { Metadata } from "next";
import { ListPageHeader } from "@/components/list-page-header";

export const metadata: Metadata = {
  title: "Customers",
};

const AddCustomer = () => {
  return <Button>Add Customer</Button>;
};

export default function Customers() {
  const customers = getCustomers();

  return (
    <>
      <ListPageHeader title="Customers" searchPlaceholder="Search customers&hellip;" button={<AddCustomer />} />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Customer ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Contact</TableHeader>
            <TableHeader>Phone</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} href={`/customers/${customer.id}`} title={customer.name}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>
                {customer.address.city}, {customer.address.province}, {customer.address.country}
              </TableCell>
              <TableCell>
                <span className="line-clamp-1">{customer.contact.name}</span>
              </TableCell>
              <TableCell className="text-right">{customer.contact.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
