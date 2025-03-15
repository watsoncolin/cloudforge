import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui/table";
import { Heading } from "@/components/catalyst-ui/heading";
import { Table } from "@/components/catalyst-ui/table";
import { getSuppliers } from "@/data";
import type { Metadata } from "next";
import { AddSupplier } from "./add";
import { Input } from "@/components/catalyst-ui/input";
import { InputGroup } from "@/components/catalyst-ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Suppliers",
};

export default function Suppliers() {
  const suppliers = getSuppliers();

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>
          Suppliers
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search suppliers&hellip;" />
              </InputGroup>
            </div>
          </div>
        </Heading>

        <AddSupplier />
      </div>
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
