import { Material, UnitOfMeasure } from 'src/enums';
import { Dimensions } from '../value-objects';
import { PurchaseOrderItemStatus } from './purchase-order-item-status.enum';

export class PurchaseOrderItem {
  constructor(
    public readonly id: string,
    public readonly purchaseOrderId: string,
    public readonly materialType: Material,
    public readonly grade: string,
    public readonly dimensions: Dimensions,
    public readonly quantity: number,
    public readonly unitOfMeasure: UnitOfMeasure,
    public readonly unitPrice: number,
    public readonly totalPrice: number,
    public readonly status: PurchaseOrderItemStatus,
  ) {}

  updateStatus(status: PurchaseOrderItemStatus) {
    return new PurchaseOrderItem(
      this.id,
      this.purchaseOrderId,
      this.materialType,
      this.grade,
      this.dimensions,
      this.quantity,
      this.unitOfMeasure,
      this.unitPrice,
      this.totalPrice,
      status,
    );
  }
}
