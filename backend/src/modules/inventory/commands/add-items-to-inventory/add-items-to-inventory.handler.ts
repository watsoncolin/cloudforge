import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import { AddItemsToInventoryCommand } from './add-items-to-inventory.command';
import { InventoryRepository } from '../../repositories/inventory.repository';
import { PurchaseOrdersService } from 'src/modules/purchase-orders/purchase-orders.service';
import { SuppliersService } from 'src/modules/suppliers/suppliers.service';
import { InventoryBatchStatus } from 'src/enums';
import { InventoryBatch } from 'src/domain/inventory/inventory-batch';

@CommandHandler(AddItemsToInventoryCommand)
export class AddItemsToInventoryHandler
  implements ICommandHandler<AddItemsToInventoryCommand>
{
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    private readonly purchaseOrderService: PurchaseOrdersService,
    private readonly supplierService: SuppliersService,
  ) {}

  async execute(command: AddItemsToInventoryCommand): Promise<void> {
    try {
      await this.handleCommand(command);
    } catch (error) {
      // TODO: Log error to monitoring service, this should cause an alert.
      console.error(error);
    }
  }

  async handleCommand(command: AddItemsToInventoryCommand): Promise<void> {
    const { materialType, grade, dimensions, unitOfMeasure, quantity, id } =
      command.purchaseOrderItem;
    const { warehouseLocation, heatNumber, millCertUrl, batchNumber } = command;

    let inventory = await this.inventoryRepository.findByMaterial(
      materialType,
      grade,
      dimensions,
    );

    if (!inventory) {
      // Create new inventory
      inventory = await this.inventoryRepository.create({
        id: uuidv4(),
        materialType,
        grade,
        dimensions,
        unitOfMeasure,
        createdAt: new Date(),
      });
    }

    const purchaseOrder = await this.purchaseOrderService.findOne(
      command.purchaseOrderItem.purchaseOrderId,
    );
    const supplier = await this.supplierService.findOne(
      purchaseOrder.supplierId,
    );

    await this.inventoryRepository.createBatch(
      inventory.id,
      new InventoryBatch(
        uuidv4(),
        inventory.id,
        supplier.id,
        purchaseOrder.id,
        id,
        quantity,
        batchNumber,
        heatNumber,
        millCertUrl,
        new Date(),
        InventoryBatchStatus.PENDING_INSPECTION,
        warehouseLocation.warehouse,
        warehouseLocation.zone,
        warehouseLocation.bin,
      ),
    );
  }
}
