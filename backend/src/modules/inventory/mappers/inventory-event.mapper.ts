import { Injectable } from '@nestjs/common';
import { InventoryEventEntity } from '../entities/inventory-event.entity';
import { InventoryEvent } from 'src/domain/inventory/inventory-event';

@Injectable()
export class InventoryEventMapper {
  toDomain(entity: InventoryEventEntity): InventoryEvent {
    return {
      id: entity.id,
      eventType: entity.eventType,
      batchId: entity.batchId,
      purchaseOrderId: entity.purchaseOrderId,
      orderId: entity.orderId,
      quantity: entity.quantity,
      inventoryId: entity.inventory.id,
      createdAt: entity.createdAt,
    };
  }
}
