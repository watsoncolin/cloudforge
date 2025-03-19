import { InventoryBatchStatus } from 'src/enums';

export class InventoryBatch {
  constructor(
    public readonly id: string,
    public readonly inventoryId: string,
    public readonly supplierId: string,
    public readonly purchaseOrderId: string,
    public readonly purchaseOrderItemId: string,
    public readonly quantity: number,
    public readonly batchNumber: string,
    public readonly heatNumber: string,
    public readonly millCertUrl: string,
    public readonly receivedAt: Date,
    public readonly status: InventoryBatchStatus,
    public readonly warehouse: string,
    public readonly zone: string,
    public readonly bin: string,
  ) {}

  updateLocation(warehouse: string, zone: string, bin: string): InventoryBatch {
    return new InventoryBatch(
      this.id,
      this.inventoryId,
      this.supplierId,
      this.purchaseOrderId,
      this.purchaseOrderItemId,
      this.quantity,
      this.batchNumber,
      this.heatNumber,
      this.millCertUrl,
      this.receivedAt,
      this.status,
      warehouse,
      zone,
      bin,
    );
  }
}
