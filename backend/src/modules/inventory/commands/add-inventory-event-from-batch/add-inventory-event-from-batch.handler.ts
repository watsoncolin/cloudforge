import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InventoryRepository } from '../../repositories/inventory.repository';
import { AddInventoryEventFromBatchCommand } from './add-inventory-event-from-batch.command';
import { InventoryEvent } from 'src/domain/inventory/inventory-event';
import { InventoryEventType } from 'src/enums';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(AddInventoryEventFromBatchCommand)
export class AddInventoryEventFromBatchHandler
  implements ICommandHandler<AddInventoryEventFromBatchCommand>
{
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(command: AddInventoryEventFromBatchCommand): Promise<void> {
    try {
      await this.handleCommand(command);
    } catch (error) {
      // TODO: Log error to monitoring service, this should cause an alert.
      console.error(error);
    }
  }

  async handleCommand(
    command: AddInventoryEventFromBatchCommand,
  ): Promise<void> {
    const { batch, inventoryId } = command;
    const inventory = await this.inventoryRepository.findById(inventoryId);
    if (!inventory) {
      throw new Error('Inventory not found');
    }
    const inventoryBatch = await this.inventoryRepository.findBatchById(
      batch.id,
    );
    if (!inventoryBatch) {
      throw new Error('Batch not found');
    }
    const inventoryEvent: InventoryEvent = {
      id: uuidv4(),
      eventType: InventoryEventType.RECEIVED,
      batchId: inventoryBatch.id,
      purchaseOrderId: null,
      orderId: null,
      quantity: inventoryBatch.quantity,
      inventoryId: inventory.id,
      createdAt: new Date(),
    };
    await this.inventoryRepository.createInventoryEvent(inventoryEvent);
  }
}
