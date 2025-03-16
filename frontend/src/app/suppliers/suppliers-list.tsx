"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui";
import { ListPageHeader } from "@/components/list-page-header";
import { useSuppliers, type SupplierDto } from "@/hooks/api-hooks";
import { AddSupplier } from "./add-supplier";

export function SuppliersList() {
  const { data: suppliers = [], isLoading, error } = useSuppliers();

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
        <p className="text-red-500">Error loading suppliers: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <ListPageHeader title="Suppliers" searchPlaceholder="Search suppliers&hellip;" button={<AddSupplier />} />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Supplier ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Contact</TableHeader>
            <TableHeader>Phone</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier: SupplierDto) => (
            <TableRow key={supplier.id} href={`/suppliers/${supplier.id}`} title={supplier.name}>
              <TableCell>{supplier.id}</TableCell>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>
                {supplier.city}, {supplier.stateProvince}, {supplier.country}
              </TableCell>
              <TableCell>
                <span className="line-clamp-1">{supplier.contactName}</span>
              </TableCell>
              <TableCell className="text-right">{supplier.contactPhone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
