import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PurchaseOrderEntity } from './purchase-order.entity';
import { Material, UnitOfMeasure } from 'src/enums';
import { PurchaseOrderItemStatus } from 'src/domain/purchase-order/purchase-order-item-status.enum';

@Entity('purchase_order_items')
export class PurchaseOrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: PurchaseOrderItemStatus.PENDING,
  })
  status: PurchaseOrderItemStatus;

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
  length: number;

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

  @Column()
  quantity: number;

  @Column()
  unitOfMeasure: UnitOfMeasure;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number): number => value,
      from: (value: string): number => parseFloat(value),
    },
  })
  unitPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number): number => value,
      from: (value: string): number => parseFloat(value),
    },
  })
  totalPrice: number;

  @Column()
  purchaseOrderId: string;

  @ManyToOne(() => PurchaseOrderEntity, (purchaseOrder) => purchaseOrder.items)
  @JoinColumn({ name: 'purchaseOrderId' })
  purchaseOrder: PurchaseOrderEntity;
}
