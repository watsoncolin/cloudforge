import { PurchaseOrderItem } from 'src/domain/purchase-order/purchase-order-item';
import { PurchaseOrderItemEntity } from '../entities/purchase-order-items.entity';
import { PurchaseOrderEntity } from '../entities/purchase-order.entity';
import { Injectable } from '@nestjs/common';

// maps from domain to entity
@Injectable()
export class PurchaseOrderItemMapper {
  toDomain(entity: PurchaseOrderItemEntity): PurchaseOrderItem {
    return {
      id: entity.id,
      materialType: entity.materialType,
      grade: entity.grade,
      dimensions: JSON.parse(entity.dimensions),
      quantity: entity.quantity,
      unitOfMeasure: entity.unitOfMeasure,
      unitPrice: entity.unitPrice,
      totalPrice: entity.totalPrice,
    };
  }
  toEntity(
    purchaseOrderItem: PurchaseOrderItem,
    purchaseOrder: PurchaseOrderEntity,
  ): PurchaseOrderItemEntity {
    return {
      id: purchaseOrderItem.id,
      materialType: purchaseOrderItem.materialType,
      grade: purchaseOrderItem.grade,
      dimensions: JSON.stringify(purchaseOrderItem.dimensions),
      quantity: purchaseOrderItem.quantity,
      unitOfMeasure: purchaseOrderItem.unitOfMeasure,
      unitPrice: purchaseOrderItem.unitPrice,
      totalPrice: purchaseOrderItem.totalPrice,
      purchaseOrder: purchaseOrder,
    };
  }
}
