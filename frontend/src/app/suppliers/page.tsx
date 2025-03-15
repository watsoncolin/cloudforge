import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from "@/components/catalyst-ui";
import { getSuppliers } from "@/data";
import type { Metadata } from "next";
import { AddSupplier } from "./add-supplier";
import { ListPageHeader } from "@/components/list-page-header";

export const metadata: Metadata = {
  title: "Suppliers",
};

export default function Suppliers() {
  const suppliers = getSuppliers();

  return (
    <>
      <ListPageHeader title="Suppliers" searchPlaceholder="Search suppliers&hellip;" button={<AddSupplier />} />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Supplier ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Materials</TableHeader>
            <TableHeader className="text-right">Rating</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id} href={`/suppliers/${supplier.id}`} title={supplier.name}>
              <TableCell>{supplier.id}</TableCell>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>
                {supplier.city}, {supplier.country}
              </TableCell>
              <TableCell>
                <span className="line-clamp-1">{supplier.materials_supplied.join(", ")}</span>
              </TableCell>
              <TableCell className="text-right">{supplier.rating} / 5</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
