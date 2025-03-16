"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui";
import { ListPageHeader } from "@/components/list-page-header";
import { useCustomers, type CustomerDto } from "@/hooks/api-hooks";
import { AddCustomer } from "./add-customer";

export function CustomersList() {
  const { data: customers = [], isLoading, error } = useCustomers();

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
        <p className="text-red-500">Error loading customers: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <ListPageHeader title="Customers" searchPlaceholder="Search customers&hellip;" button={<AddCustomer />} />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Contact</TableHeader>
            <TableHeader>Phone</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer: CustomerDto) => (
            <TableRow key={customer.id} href={`/customers/${customer.id}`} title={customer.name}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>
                {customer.address.city}, {customer.address.stateProvince}, {customer.address.country}
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
