import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePurchaseOrderCommand } from './create-purchase-order.command';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
import { v4 as uuidv4 } from 'uuid';
import { PurchaseOrdersRepository } from '../../repositories/purchase-order.repository';

@CommandHandler(CreatePurchaseOrderCommand)
export class CreatePurchaseOrderHandler
  implements ICommandHandler<CreatePurchaseOrderCommand>
{
  constructor(
    private readonly purchaseOrderRepository: PurchaseOrdersRepository,
  ) {}

  async execute(command: CreatePurchaseOrderCommand): Promise<PurchaseOrder> {
    const purchaseOrder: PurchaseOrder = new PurchaseOrder(
      uuidv4(),
      command.createPurchaseOrderDto.supplierId,
      command.createPurchaseOrderDto.orderDate,
      command.createPurchaseOrderDto.status,
      command.createPurchaseOrderDto.items,
      command.createPurchaseOrderDto.currency,
      new Date(),
      new Date(),
      new Date(command.createPurchaseOrderDto.expectedDeliveryDate),
    );
    return this.purchaseOrderRepository.create(purchaseOrder);
  }
}
