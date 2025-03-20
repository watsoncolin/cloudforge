import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { UnitOfMeasure, Material } from 'src/enums';
import { InventoryEntity } from 'src/modules/inventory/entities/inventory.entity';
import { InventoryBatchEntity } from 'src/modules/inventory/entities/inventory-batch.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  order: OrderEntity;

  @Column({ type: 'enum', enum: UnitOfMeasure })
  unitOfMeasure: UnitOfMeasure; // e.g., CWT, lbs, ft, pieces

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number; // Requested quantity

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number; // Price per unit

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number; // Total price

  @Column({ type: 'uuid' })
  inventoryId: string;

  @ManyToOne(() => InventoryEntity, (inventory) => inventory.orderItems)
  inventory: InventoryEntity;

  @ManyToMany(() => InventoryBatchEntity, (batch) => batch.orderItems)
  @JoinTable({
    name: 'order_item_batches',
    joinColumn: {
      name: 'orderItemId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'batchId',
      referencedColumnName: 'id',
    },
  })
  batches: InventoryBatchEntity[];
}
