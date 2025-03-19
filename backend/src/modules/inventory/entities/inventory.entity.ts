import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Material, UnitOfMeasure } from 'src/enums';
import { InventoryEventEntity } from './inventory-event.entity';
import { InventoryBatchEntity } from './inventory-batch.entity';
import { Transform } from 'class-transformer';
import { OrderItemEntity } from 'src/modules/orders/entities/order-item.entity';
import { QuoteItemEntity } from 'src/modules/quotes/entities/quote-item.entity';
@Entity('inventory')
export class InventoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  materialType: Material;

  @Column()
  grade: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number): number => value,
      from: (value: string): number => parseFloat(value),
    },
  })
  thickness: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number): number => value,
      from: (value: string): number => parseFloat(value),
    },
  })
  width: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (value: number): number => value,
      from: (value: string): number => parseFloat(value),
    },
  })
  length?: number;

  @Column()
  unitOfMeasure: UnitOfMeasure;

  @Column()
  createdAt: Date;

  @OneToMany(() => InventoryEventEntity, (event) => event.inventory)
  events: InventoryEventEntity[];

  @OneToMany(() => InventoryBatchEntity, (batch) => batch.inventory)
  batches: InventoryBatchEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.inventory)
  orderItems: OrderItemEntity[];
}
