import { PurchaseOrderItem } from 'src/domain/purchase-order/purchase-order-item';
import { PurchaseOrderItemEntity } from '../entities/purchase-order-items.entity';
import { PurchaseOrderEntity } from '../entities/purchase-order.entity';
import { Injectable } from '@nestjs/common';

// maps from domain to entity
@Injectable()
export class PurchaseOrderItemMapper {
  toDomain(entity: PurchaseOrderItemEntity): PurchaseOrderItem {
    return new PurchaseOrderItem(
      entity.id,
      entity.purchaseOrderId,
      entity.materialType,
      entity.grade,
      {
        length: entity.length,
        width: entity.width,
        thickness: entity.thickness,
      },
      entity.quantity,
      entity.unitOfMeasure,
      entity.unitPrice,
      entity.totalPrice,
      entity.status,
    );
  }
  toEntity(
    purchaseOrderItem: PurchaseOrderItem,
    purchaseOrder: PurchaseOrderEntity,
  ): PurchaseOrderItemEntity {
    return {
      id: purchaseOrderItem.id,
      status: purchaseOrderItem.status,
      materialType: purchaseOrderItem.materialType,
      grade: purchaseOrderItem.grade,
      length: purchaseOrderItem.dimensions.length,
      width: purchaseOrderItem.dimensions.width,
      thickness: purchaseOrderItem.dimensions.thickness,
      quantity: purchaseOrderItem.quantity,
      unitOfMeasure: purchaseOrderItem.unitOfMeasure,
      unitPrice: purchaseOrderItem.unitPrice,
      totalPrice: purchaseOrderItem.totalPrice,
      purchaseOrder: purchaseOrder,
      purchaseOrderId: purchaseOrder.id,
    };
  }
}
