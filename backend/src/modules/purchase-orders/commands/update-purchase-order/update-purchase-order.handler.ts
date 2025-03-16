import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UpdatePurchaseOrderCommand } from './update-purchase-order.command';
import { PurchaseOrdersRepository } from '../../repositories/purchase-order.repository';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';

@CommandHandler(UpdatePurchaseOrderCommand)
export class UpdatePurchaseOrderHandler
  implements ICommandHandler<UpdatePurchaseOrderCommand>
{
  constructor(
    private readonly purchaseOrderRepository: PurchaseOrdersRepository,
  ) {}

  async execute(command: UpdatePurchaseOrderCommand): Promise<PurchaseOrder> {
    const purchaseOrder = await this.purchaseOrderRepository.findById(
      command.id,
    );

    if (!purchaseOrder) {
      throw new NotFoundException(
        `Purchase order with ID "${command.id}" not found`,
      );
    }

    Object.assign(purchaseOrder, command.updatePurchaseOrderDto);
    return this.purchaseOrderRepository.update(purchaseOrder.id, purchaseOrder);
  }
}
