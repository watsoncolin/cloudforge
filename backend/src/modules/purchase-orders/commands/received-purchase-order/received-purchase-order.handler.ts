import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
import { PurchaseOrdersRepository } from '../../repositories/purchase-order.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PurchaseOrderStatus } from 'src/domain/purchase-order/purchase-order-status.enum';
import { ReceivedPurchaseOrderCommand } from './received-purchase-order.command';
import { EventBus } from '@nestjs/cqrs';
import { PurchaseOrderItemStatus } from 'src/domain/purchase-order/purchase-order-item-status.enum';
import { PurchaseOrderItemReceivedEvent } from 'src/events/purchase-order-item-received.event';
@CommandHandler(ReceivedPurchaseOrderCommand)
export class ReceivedPurchaseOrderHandler
  implements ICommandHandler<ReceivedPurchaseOrderCommand>
{
  constructor(
    private readonly purchaseOrderRepository: PurchaseOrdersRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ReceivedPurchaseOrderCommand): Promise<PurchaseOrder> {
    const purchaseOrder =
      await this.purchaseOrderRepository.findByPurchaseOrderItemId(
        command.purchaseOrderItemId,
      );
    if (!purchaseOrder) {
      throw new NotFoundException('Purchase order not found');
    }

    if (purchaseOrder.status !== PurchaseOrderStatus.SHIPPED) {
      throw new BadRequestException('Purchase order is not shipped');
    }

    const purchaseOrderItem = purchaseOrder.items.find(
      (item) => item.id === command.purchaseOrderItemId,
    );
    if (!purchaseOrderItem) {
      throw new NotFoundException('Purchase order item not found');
    }

    const updatedPurchaseOrderItem = purchaseOrderItem.updateStatus(
      PurchaseOrderItemStatus.RECEIVED,
    );

    await this.purchaseOrderRepository.updatePurchaseOrderItem(
      purchaseOrderItem.id,
      updatedPurchaseOrderItem,
    );

    const updatedPurchaseOrder = await this.purchaseOrderRepository.findById(
      purchaseOrder.id,
    );

    // Update the purchase order status to received if all items are received.
    const allItemsReceived = updatedPurchaseOrder.items.every(
      (item) => item.status === PurchaseOrderItemStatus.RECEIVED,
    );

    if (allItemsReceived) {
      const updatedPurchaseOrder = purchaseOrder.markReceived();
      await this.purchaseOrderRepository.update(
        purchaseOrder.id,
        updatedPurchaseOrder,
      );
    }

    this.eventBus.publish(
      new PurchaseOrderItemReceivedEvent(
        purchaseOrder,
        purchaseOrderItem,
        {
          warehouse: command.receivePurchaseOrderDto.warehouseLocation.name,
          zone: command.receivePurchaseOrderDto.warehouseLocation.zone,
          bin: command.receivePurchaseOrderDto.warehouseLocation.bin,
        },
        command.receivePurchaseOrderDto.heatNumber,
        command.receivePurchaseOrderDto.millCertUrl,
        command.receivePurchaseOrderDto.batchNumber,
      ),
    );
    return purchaseOrder;
  }
}
