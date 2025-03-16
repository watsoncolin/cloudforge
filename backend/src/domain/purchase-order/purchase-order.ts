import { PurchaseOrderItem } from './purchase-order-item';
import { PurchaseOrderStatus } from './purchase-order-status.enum';

export class PurchaseOrder {
  constructor(
    public id: string,
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
}
