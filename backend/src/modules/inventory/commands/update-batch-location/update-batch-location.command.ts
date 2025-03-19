import { ICommand } from '@nestjs/cqrs';
import { WarehouseLocation } from 'src/domain/value-objects/warehouse-location';

export class UpdateBatchLocationCommand implements ICommand {
  constructor(
    public readonly inventoryId: string,
    public readonly batchId: string,
    public readonly warehouseLocation: WarehouseLocation,
  ) {}
}
