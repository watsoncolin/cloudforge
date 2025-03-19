import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePurchaseOrderCommand } from './create-purchase-order.command';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
import { v4 as uuidv4 } from 'uuid';
import { PurchaseOrdersRepository } from '../../repositories/purchase-order.repository';
import { SequenceService } from '../../../core/sequence/services/sequence.service';
import { PurchaseOrderItemStatus } from 'src/domain/purchase-order/purchase-order-item-status.enum';
import { PurchaseOrderItem } from 'src/domain/purchase-order/purchase-order-item';
@CommandHandler(CreatePurchaseOrderCommand)
export class CreatePurchaseOrderHandler
  implements ICommandHandler<CreatePurchaseOrderCommand>
{
  constructor(
    private readonly purchaseOrderRepository: PurchaseOrdersRepository,
    private readonly sequenceService: SequenceService,
  ) {}

  async execute(command: CreatePurchaseOrderCommand): Promise<PurchaseOrder> {
    const readableId = await this.sequenceService.getNextSequenceNumber('PO');
    const purchaseOrder: PurchaseOrder = new PurchaseOrder(
      uuidv4(),
      readableId,
      command.createPurchaseOrderDto.supplierId,
      command.createPurchaseOrderDto.orderDate,
      command.createPurchaseOrderDto.status,
      command.createPurchaseOrderDto.items.map((item) => {
        const purchaseOrderItem = new PurchaseOrderItem(
          uuidv4(),
          purchaseOrder.id,
          item.materialType,
          item.grade,
          item.dimensions,
          item.quantity,
          item.unitOfMeasure,
          item.unitPrice,
          item.totalPrice,
          PurchaseOrderItemStatus.PENDING,
        );
        return purchaseOrderItem;
      }),
      command.createPurchaseOrderDto.currency,
      new Date(),
      new Date(),
      new Date(command.createPurchaseOrderDto.expectedDeliveryDate),
    );
    return this.purchaseOrderRepository.create(purchaseOrder);
  }
}
