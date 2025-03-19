import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
import { PurchaseOrderEntity } from '../entities/purchase-order.entity';
import { PurchaseOrderItemMapper } from './purchase-order-item.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PurchaseOrderMapper {
  constructor(
    private readonly purchaseOrderItemMapper: PurchaseOrderItemMapper,
  ) {}
  toDomain(entity: PurchaseOrderEntity): PurchaseOrder {
    const items = entity.items.map((item) =>
      this.purchaseOrderItemMapper.toDomain(item),
    );
    return new PurchaseOrder(
      entity.id,
      entity.readableId,
      entity.supplierId,
      entity.orderDate,
      entity.status,
      items,
      entity.currency,
      entity.createdAt,
      entity.updatedAt,
      entity.expectedDeliveryDate,
    );
  }
  toEntity(purchaseOrder: PurchaseOrder): PurchaseOrderEntity {
    const entity = {
      id: purchaseOrder.id,
      readableId: purchaseOrder.readableId,
      supplierId: purchaseOrder.supplierId,
      orderDate: purchaseOrder.orderDate,
      status: purchaseOrder.status,
      expectedDeliveryDate: purchaseOrder.expectedDeliveryDate,
      currency: purchaseOrder.currency,
      totalPrice: purchaseOrder.totalPrice,
      items: [],
      createdAt: purchaseOrder.createdAt,
      updatedAt: purchaseOrder.updatedAt,
    };
    for (const item of purchaseOrder.items) {
      entity.items.push(this.purchaseOrderItemMapper.toEntity(item, entity));
    }
    return entity;
  }
}
