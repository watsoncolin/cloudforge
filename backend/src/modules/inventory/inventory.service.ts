import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InventoryWithQuantities } from 'src/domain/inventory/inventory-with-quantities';
import { ReadAllInventoryQuery } from './queries/read-all-inventory/read-all-inventory.query';
import { ReadInventoryByIdQuery } from './queries/read-inventory-by-id/read-inventory-by-id.query';
import { InventoryBatch } from 'src/domain/inventory/inventory-batch';
import { ReadBatchesByInventoryIdQuery } from './queries/read-batches-by-inventory-id/read-batches-by-inventory-id.query';
import { UpdateBatchLocationCommand } from './commands/update-batch-location/update-batch-location.command';
import { WarehouseLocation } from 'src/domain/value-objects/warehouse-location';

@Injectable()
export class InventoryService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async findAll(): Promise<InventoryWithQuantities[]> {
    return this.queryBus.execute(new ReadAllInventoryQuery());
  }

  async findOne(id: string): Promise<InventoryWithQuantities> {
    return this.queryBus.execute(new ReadInventoryByIdQuery(id));
  }

  async findBatchesByInventoryId(id: string): Promise<InventoryBatch[]> {
    return this.queryBus.execute(new ReadBatchesByInventoryIdQuery(id));
  }

  async updateBatch(
    inventoryId: string,
    batchId: string,
    warehouseLocation: WarehouseLocation,
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateBatchLocationCommand(inventoryId, batchId, warehouseLocation),
    );
  }
}
