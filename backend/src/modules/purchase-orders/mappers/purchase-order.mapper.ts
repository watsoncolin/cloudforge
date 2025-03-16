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
    return {
      id: entity.id,
      supplierId: entity.supplierId,
      orderDate: entity.orderDate,
      status: entity.status,
      expectedDeliveryDate: entity.expectedDeliveryDate,
      currency: entity.currency,
      totalPrice: entity.totalPrice,
      items: entity.items.map((item) =>
        this.purchaseOrderItemMapper.toDomain(item),
      ),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
  toEntity(purchaseOrder: PurchaseOrder): PurchaseOrderEntity {
    const entity = {
      id: purchaseOrder.id,
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
