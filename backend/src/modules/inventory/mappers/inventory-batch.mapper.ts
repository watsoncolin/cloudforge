import { Injectable } from '@nestjs/common';
import { InventoryBatch } from 'src/domain/inventory/inventory-batch';
import { InventoryBatchEntity } from '../entities/inventory-batch.entity';

@Injectable()
export class InventoryBatchMapper {
  toDomain(entity: InventoryBatchEntity): InventoryBatch {
    return new InventoryBatch(
      entity.id,
      entity.inventory.id,
      entity.supplier.id,
      entity.purchaseOrderId,
      entity.purchaseOrderItemId,
      entity.quantityReceived,
      entity.batchNumber,
      entity.heatNumber,
      entity.millCertUrl,
      entity.receivedAt,
      entity.status,
      entity.warehouse,
      entity.zone,
      entity.bin,
    );
  }
  toEntity(batch: InventoryBatch): Partial<InventoryBatchEntity> {
    return {
      id: batch.id,
      batchNumber: batch.batchNumber,
      purchaseOrderId: batch.purchaseOrderId,
      quantityReceived: batch.quantity,
      status: batch.status,
      warehouse: batch.warehouse,
      zone: batch.zone,
      bin: batch.bin,
      receivedAt: batch.receivedAt,
      heatNumber: batch.heatNumber,
      millCertUrl: batch.millCertUrl,
      purchaseOrderItemId: batch.purchaseOrderItemId,
    };
  }
}
