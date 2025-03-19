import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { InventoryEntity } from './inventory.entity';
import { SupplierEntity } from 'src/modules/suppliers/entities/supplier.entity';
import { InventoryBatchStatus } from 'src/enums/inventory-batch-status.enum';
import { OrderItemEntity } from 'src/modules/orders/entities/order-item.entity';

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

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.batches)
  orderItems: OrderItemEntity[];
}
