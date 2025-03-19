import { ICommand } from '@nestjs/cqrs';
import { InventoryBatch } from 'src/domain/inventory/inventory-batch';

export class AddInventoryEventFromBatchCommand implements ICommand {
  constructor(
    public readonly batch: InventoryBatch,
    public readonly inventoryId: string,
  ) {}
}
