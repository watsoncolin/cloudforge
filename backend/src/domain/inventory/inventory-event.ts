import { InventoryEventType } from 'src/enums';

export class InventoryEvent {
  id: string;
  eventType: InventoryEventType;
  batchId?: string;
  purchaseOrderId?: string;
  orderId?: string;
  quantity: number;
  inventoryId: string;
  createdAt: Date;
}
