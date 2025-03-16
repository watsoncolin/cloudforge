import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { PurchaseOrdersRepository } from '../../repositories/purchase-order.repository';
import { DeletePurchaseOrderCommand } from './delete-purchase-order.command';

@CommandHandler(DeletePurchaseOrderCommand)
export class DeletePurchaseOrderHandler
  implements ICommandHandler<DeletePurchaseOrderCommand>
{
  constructor(
    private readonly purchaseOrderRepository: PurchaseOrdersRepository,
  ) {}

  async execute(command: DeletePurchaseOrderCommand): Promise<void> {
    const purchaseOrder = await this.purchaseOrderRepository.findById(
      command.id,
    );

    if (!purchaseOrder) {
      throw new NotFoundException(
        `Purchase order with ID "${command.id}" not found`,
      );
    }

    await this.purchaseOrderRepository.delete(purchaseOrder.id);
  }
}
