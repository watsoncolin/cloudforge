import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../entities/order.entity';
import { Order } from 'src/domain/order/order';

@Injectable()
export class OrderMapper {
  toDomain(entity: OrderEntity): Order {
    return {
      id: entity.id,
      readableId: entity.readableId,
      customerId: entity.customer.id,
      quoteId: entity?.quote?.id,
      items: entity.items.map((item) => ({
        id: item.id,
        orderId: entity.id,
        inventoryId: item.inventoryId,
        batchIds: item.batches.map((batch) => batch.id),
        quantity: item.quantity,
        unitOfMeasure: item.unitOfMeasure,
        price: item.price,
        total: item.total,
      })),
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
