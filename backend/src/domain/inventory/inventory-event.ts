import { InventoryEventType } from 'src/enums';

export class InventoryEvent {
  id: string;
  eventType: InventoryEventType;
  batchId?: string;
  purchaseOrderId?: string;
  salesOrderId?: string;
  quantity: number;
  inventoryId: string;
  createdAt: Date;
}
