import { InventoryBatch } from 'src/domain/inventory/inventory-batch';

export class InventoryBatchAddedEvent {
  constructor(
    public readonly inventoryId: string,
    public readonly batch: InventoryBatch,
  ) {}
}
