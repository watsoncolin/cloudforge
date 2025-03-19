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
import { BatchDto } from "@/api/generated";

import { useState } from "react";
import { useUpdateBatchLocation } from "@/hooks/api-hooks";

export function MoveInventory({
  batch,
  inventoryId,
  ...props
}: {
  batch: BatchDto;
  inventoryId: string;
} & React.ComponentPropsWithoutRef<typeof Button>) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: updateBatchLocation, isPending } = useUpdateBatchLocation();
  const [warehouse, setWarehouse] = useState(batch.location.warehouse);
  const [zone, setZone] = useState(batch.location.zone);
  const [bin, setBin] = useState(batch.location.bin);

  const handleMoveInventory = async () => {
    await updateBatchLocation({
      id: inventoryId,
      batchId: batch.id,
      data: {
        warehouse,
        zone,
        bin,
      },
    });
    setIsOpen(false);
  };

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
              <Input
                name="warehouse"
                defaultValue={warehouse}
                placeholder="0"
                autoFocus
                onChange={(e) => setWarehouse(e.target.value)}
              />
            </Field>
            <Field>
              <Label>Zone</Label>
              <Select name="zone" defaultValue={zone} onChange={(e) => setZone(e.target.value)}>
                <option value="" disabled>
                  Select a zone&hellip;
                </option>
                <option value="1">Zone 1</option>
                <option value="2">Zone 2</option>
                <option value="3">Zone 3</option>
                <option value="4">Zone 4</option>
                <option value="5">Zone 5</option>
                <option value="6">Zone 6</option>
                <option value="7">Zone 7</option>
                <option value="8">Zone 8</option>
                <option value="9">Zone 9</option>
                <option value="10">Zone 10</option>
              </Select>
            </Field>
            <Field>
              <Label>Bin</Label>
              <Input name="bin" defaultValue={bin} placeholder="0" onChange={(e) => setBin(e.target.value)} />
            </Field>
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleMoveInventory()} disabled={isPending}>
            Move
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
