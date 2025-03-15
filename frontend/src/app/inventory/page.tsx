import { TableCell, TableBody, TableRow, TableHead, Table, TableHeader } from "@/components/catalyst-ui";
import { getInventory } from "@/data";
import { AddInventory } from "./[id]/add-inventory";
import { ListPageHeader } from "@/components/list-page-header";

export default function InventoryPage() {
  const inventory = getInventory();

  return (
    <>
      <ListPageHeader title="Inventory" button={<AddInventory />} />
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Material Type</TableHeader>
            <TableHeader>Grade</TableHeader>
            <TableHeader>Dimensions</TableHeader>
            <TableHeader>Total Stock</TableHeader>
            <TableHeader>Available Stock</TableHeader>
            <TableHeader>Allocated Stock</TableHeader>
            <TableHeader>Reorder Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((inventory) => (
            <TableRow
              key={inventory.id}
              href={`/inventory/${inventory.id}`}
              title={inventory.materialType}
              className={
                inventory.reorderStatus === "Low Stock"
                  ? "bg-amber-50"
                  : inventory.reorderStatus === "Critical"
                  ? "bg-red-50"
                  : ""
              }
            >
              <TableCell>{inventory.id}</TableCell>
              <TableCell>{inventory.materialType}</TableCell>
              <TableCell>{inventory.grade}</TableCell>
              <TableCell>
                {inventory.dimensions.thickness} x {inventory.dimensions.width} x {inventory.dimensions.length}
              </TableCell>
              <TableCell>
                {inventory.totalStock} {inventory.unitOfMeasure}
              </TableCell>
              <TableCell>{inventory.availableStock}</TableCell>
              <TableCell>{inventory.allocatedStock}</TableCell>
              <TableCell>{inventory.reorderStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
