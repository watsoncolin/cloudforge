"use client";

import { InventoryDto } from "@/api/generated";
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
import { useState } from "react";

export function AdjustInventory({
  inventory,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & { inventory: InventoryDto }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Adjust Inventory</DialogTitle>
        <DialogDescription>
          Adjust the inventory by the amount specified. Negative values will reduce the inventory.
        </DialogDescription>
        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Adjustment Amount</Label>
              <Input name="amount" defaultValue={0} placeholder="0" autoFocus />
            </Field>
            <Field>
              <Label>Batch</Label>
              <Select name="batch" defaultValue="">
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
            <Field>
              <Label>Reason</Label>
              <Select name="reason" defaultValue="">
                <option value="" disabled>
                  Select a reason&hellip;
                </option>
                <option value="scrap_waste">Scrap & Waste</option>
                <option value="damage">Damage</option>
                <option value="theft_loss">Theft or Loss</option>
                <option value="other">Other</option>
              </Select>
            </Field>
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Adjust</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
