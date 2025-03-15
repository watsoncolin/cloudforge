"use client";

import {
  DialogBody,
  FieldGroup,
  DialogActions,
  Button,
  Dialog,
  DialogDescription,
  DialogTitle,
  Field,
  Input,
  Label,
  Select,
} from "@/components/catalyst-ui";
import { InventoryItem } from "@/domain/inventory-item";

import { useState } from "react";

export function MoveInventory({
  inventory,
  ...props
}: { inventory: InventoryItem } & React.ComponentPropsWithoutRef<typeof Button>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Move Inventory</DialogTitle>
        <DialogDescription>Move the inventory to a different location.</DialogDescription>
        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Warehouse</Label>
              <Input name="warehouse" defaultValue={inventory.warehouseLocation.warehouse} placeholder="0" autoFocus />
            </Field>
            <Field>
              <Label>Zone</Label>
              <Select name="zone" defaultValue={inventory.warehouseLocation.zone}>
                <option value="" disabled>
                  Select a zone&hellip;
                </option>
                <option value="zone_1">Zone 1</option>
                <option value="zone_2">Zone 2</option>
                <option value="zone_3">Zone 3</option>
                <option value="zone_4">Zone 4</option>
                <option value="zone_5">Zone 5</option>
                <option value="zone_6">Zone 6</option>
                <option value="zone_7">Zone 7</option>
                <option value="zone_8">Zone 8</option>
                <option value="zone_9">Zone 9</option>
                <option value="zone_10">Zone 10</option>
              </Select>
            </Field>
            <Field>
              <Label>Bin</Label>
              <Input name="bin" defaultValue={inventory.warehouseLocation.bin} placeholder="0" />
            </Field>
            <Field>
              <Label>Batch</Label>
              <Select name="batch" defaultValue={inventory.batches[0].id}>
                <option value="" disabled>
                  Select a batch&hellip;
                </option>
                {inventory.batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.batchNumber}
                  </option>
                ))}
              </Select>
            </Field>
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Move</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
