import { PurchaseOrderItem } from './purchase-order-item';
import { PurchaseOrderStatus } from './purchase-order-status.enum';

export class PurchaseOrder {
  constructor(
    public id: string,
    public readableId: string,
    public supplierId: string,
    public orderDate: string,
    public status: PurchaseOrderStatus,
    public items: PurchaseOrderItem[],
    public currency: string,
    public createdAt: Date,
    public updatedAt?: Date,
    public expectedDeliveryDate?: Date,
  ) {}

  get totalPrice(): number {
    return this.items.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  approve(): PurchaseOrder {
    if (this.status !== PurchaseOrderStatus.PENDING_APPROVAL) {
      throw new Error('Purchase order is not pending approval');
    }
    return new PurchaseOrder(
      this.id,
      this.readableId,
      this.supplierId,
      this.orderDate,
      PurchaseOrderStatus.APPROVED,
      this.items,
      this.currency,
      this.createdAt,
      this.updatedAt,
      this.expectedDeliveryDate,
    );
  }

  markShipped(): PurchaseOrder {
    if (this.status !== PurchaseOrderStatus.APPROVED) {
      throw new Error('Purchase order is not approved');
    }
    return new PurchaseOrder(
      this.id,
      this.readableId,
      this.supplierId,
      this.orderDate,
      PurchaseOrderStatus.SHIPPED,
      this.items,
      this.currency,
      this.createdAt,
      this.updatedAt,
      this.expectedDeliveryDate,
    );
  }

  markReceived(): PurchaseOrder {
    if (this.status !== PurchaseOrderStatus.SHIPPED) {
      throw new Error('Purchase order is not shipped');
    }
    return new PurchaseOrder(
      this.id,
      this.readableId,
      this.supplierId,
      this.orderDate,
      PurchaseOrderStatus.RECEIVED,
      this.items,
      this.currency,
      this.createdAt,
      this.updatedAt,
      this.expectedDeliveryDate,
    );
  }
}
