import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
import { v4 as uuidv4 } from 'uuid';
import { PurchaseOrdersRepository } from '../../repositories/purchase-order.repository';
import { ApprovePurchaseOrderCommand } from './approve-purchase-order.command';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PurchaseOrderStatus } from 'src/domain/purchase-order/purchase-order-status.enum';

@CommandHandler(ApprovePurchaseOrderCommand)
export class ApprovePurchaseOrderHandler
  implements ICommandHandler<ApprovePurchaseOrderCommand>
{
  constructor(
    private readonly purchaseOrderRepository: PurchaseOrdersRepository,
  ) {}

  async execute(command: ApprovePurchaseOrderCommand): Promise<PurchaseOrder> {
    const purchaseOrder = await this.purchaseOrderRepository.findById(
      command.id,
    );
    if (!purchaseOrder) {
      throw new NotFoundException('Purchase order not found');
    }
    if (purchaseOrder.status !== PurchaseOrderStatus.PENDING_APPROVAL) {
      throw new BadRequestException('Purchase order is not pending approval');
    }
    const updatedPurchaseOrder = purchaseOrder.approve();
    return this.purchaseOrderRepository.update(
      command.id,
      updatedPurchaseOrder,
    );
  }
}
