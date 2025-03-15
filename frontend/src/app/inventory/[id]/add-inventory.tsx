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
import { useState } from "react";

export function AddInventory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Add Inventory
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add Inventory</DialogTitle>
        <DialogDescription>Add a batch to the inventory.</DialogDescription>
        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Material Type</Label>
              <Select name="materialType" defaultValue="">
                <option value="" disabled>
                  Select a material type&hellip;
                </option>
                <option value="steel">Steel</option>
                <option value="aluminum">Aluminum</option>
                <option value="copper">Copper</option>
                <option value="brass">Brass</option>
                <option value="bronze">Bronze</option>
                <option value="nickel">Nickel</option>
                <option value="zinc">Zinc</option>
                <option value="other">Other</option>
              </Select>
            </Field>
            <Field>
              <Label>Grade</Label>
              <Select name="grade" defaultValue="">
                <option value="" disabled>
                  Select a grade&hellip;
                </option>
                <option value="1018">1018</option>
                <option value="1020">1020</option>
                <option value="1022">1022</option>
                <option value="1024">1024</option>
                <option value="1026">1026</option>
              </Select>
            </Field>
            <Field>
              <Label>Dimensions</Label>
              <Input name="dimensions" placeholder="" />
            </Field>
            <Field>
              <Label>Unit of Measure</Label>
              <Input name="unitOfMeasure" placeholder="Lbs" />
            </Field>
            <Field>
              <Label>Warehouse Location</Label>
              <Select name="warehouseLocation" defaultValue="">
                <option value="" disabled>
                  Select a warehouse location&hellip;
                </option>
                <option value="warehouse1">Warehouse 1</option>
                <option value="warehouse2">Warehouse 2</option>
              </Select>
            </Field>
            <Field>
              <Label>Zone</Label>
              <Select name="zone" defaultValue="">
                <option value="" disabled>
                  Select a zone&hellip;
                </option>
                <option value="zone1">Zone 1</option>
                <option value="zone2">Zone 2</option>
              </Select>
            </Field>
            <Field>
              <Label>Bin</Label>
              <Input name="bin" placeholder="0" />
            </Field>
            <Field>
              <Label>Batch Number</Label>
              <Input name="batchNumber" placeholder="" />
            </Field>
            <Field>
              <Label>Heat Number</Label>
              <Input name="heatNumber" placeholder="" />
            </Field>
            <Field>
              <Label>Mill Certification</Label>
              <Input name="millCertification" placeholder="" />
            </Field>
            <Field>
              <Label>Total Stock</Label>
              <Input name="totalStock" placeholder="" />
            </Field>
            <Field>
              <Label>Available Stock</Label>
              <Input name="availableStock" placeholder="" />
            </Field>
            <Field>
              <Label>Allocated Stock</Label>
              <Input name="allocatedStock" placeholder="0" />
            </Field>
            <Field>
              <Label>Quality Issues</Label>
              <Select name="qualityIssues" defaultValue="">
                <option value="" disabled>
                  Select a quality issue&hellip;
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </Field>
            <Field>
              <Label>Supplier</Label>
              <Input name="supplier" placeholder="0" />
            </Field>
            <Field>
              <Label>Purchase Order</Label>
              <Input name="purchaseOrder" placeholder="0" />
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
