import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
import { PurchaseOrderItem } from 'src/domain/purchase-order/purchase-order-item';
import { WarehouseLocation } from 'src/domain/value-objects/warehouse-location';

export class PurchaseOrderItemReceivedEvent {
  constructor(
    public readonly purchaseOrder: PurchaseOrder,
    public readonly purchaseOrderItem: PurchaseOrderItem,
    public readonly warehouseLocation: WarehouseLocation,
    public readonly heatNumber: string,
    public readonly millCertUrl: string,
    public readonly batchNumber: string,
  ) {}
}
