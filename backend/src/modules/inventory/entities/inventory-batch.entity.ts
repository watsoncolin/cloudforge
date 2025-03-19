import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { InventoryEntity } from './inventory.entity';
import { SupplierEntity } from 'src/modules/suppliers/entities/supplier.entity';
import { InventoryBatchStatus } from 'src/enums/inventory-batch-status.enum';

@Entity('inventory_batches')
export class InventoryBatchEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  batchNumber: string;

  @ManyToOne(() => InventoryEntity, (inventory) => inventory.batches)
  inventory: InventoryEntity;

  @Column()
  purchaseOrderId: string;

  @Column()
  purchaseOrderItemId: string;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.batches)
  supplier: SupplierEntity;

  @Column()
  heatNumber: string;

  @Column({ nullable: true })
  millCertUrl?: string;

  @Column()
  quantityReceived: number;

  @Column({
    type: 'enum',
    enum: InventoryBatchStatus,
    default: InventoryBatchStatus.PENDING_INSPECTION,
  })
  status: InventoryBatchStatus;

  @Column()
  warehouse: string;

  @Column()
  zone: string;

  @Column()
  bin: string;

  @Column()
  receivedAt: Date;
}
