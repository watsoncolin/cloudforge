import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
import { v4 as uuidv4 } from 'uuid';
import { PurchaseOrdersRepository } from '../../repositories/purchase-order.repository';
import { MarkShippedPurchaseOrderCommand } from './mark-shipped-purchase-order.command';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PurchaseOrderStatus } from 'src/domain/purchase-order/purchase-order-status.enum';
import { PurchaseOrderItemStatus } from 'src/domain/purchase-order/purchase-order-item-status.enum';
import { PurchaseOrderItem } from 'src/domain/purchase-order/purchase-order-item';

@CommandHandler(MarkShippedPurchaseOrderCommand)
export class MarkShippedPurchaseOrderHandler
  implements ICommandHandler<MarkShippedPurchaseOrderCommand>
{
  constructor(
    private readonly purchaseOrderRepository: PurchaseOrdersRepository,
  ) {}

  async execute(
    command: MarkShippedPurchaseOrderCommand,
  ): Promise<PurchaseOrder> {
    const purchaseOrder = await this.purchaseOrderRepository.findById(
      command.id,
    );
    if (!purchaseOrder) {
      throw new NotFoundException('Purchase order not found');
    }
    if (purchaseOrder.status !== PurchaseOrderStatus.APPROVED) {
      throw new BadRequestException('Purchase order is not approved');
    }
    const updatedPurchaseOrder = purchaseOrder.markShipped();

    const purchaseOrderItems = updatedPurchaseOrder.items.map((item) => {
      const purchaseOrderItem = new PurchaseOrderItem(
        item.id,
        item.purchaseOrderId,
        item.materialType,
        item.grade,
        item.dimensions,
        item.quantity,
        item.unitOfMeasure,
        item.unitPrice,
        item.totalPrice,
        PurchaseOrderItemStatus.SHIPPED,
      );
      return purchaseOrderItem;
    });

    await Promise.all(
      purchaseOrderItems.map((item) => {
        this.purchaseOrderRepository.updatePurchaseOrderItem(item.id, item);
      }),
    );

    return this.purchaseOrderRepository.update(
      command.id,
      updatedPurchaseOrder,
    );
  }
}
