import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBatchLocationCommand } from './update-batch-location.command';
import { InventoryRepository } from '../../repositories/inventory.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateBatchLocationCommand)
export class UpdateBatchLocationHandler
  implements ICommandHandler<UpdateBatchLocationCommand>
{
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(command: UpdateBatchLocationCommand): Promise<void> {
    try {
      await this.handleCommand(command);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async handleCommand(command: UpdateBatchLocationCommand): Promise<void> {
    const { batchId, warehouseLocation } = command;

    const batch = await this.inventoryRepository.findBatchById(batchId);
    if (!batch) {
      throw new NotFoundException('Batch not found');
    }

    const updatedBatch = batch.updateLocation(
      warehouseLocation.warehouse,
      warehouseLocation.zone,
      warehouseLocation.bin,
    );

    await this.inventoryRepository.updateBatch(updatedBatch);
  }
}
