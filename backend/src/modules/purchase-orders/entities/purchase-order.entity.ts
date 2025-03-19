import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseOrderItemEntity } from './purchase-order-items.entity';
import { PurchaseOrderStatus } from 'src/domain';

@Entity('purchase_orders')
export class PurchaseOrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  readableId: string;

  @Column()
  supplierId: string;

  @Column()
  orderDate: string;

  @Column()
  status: PurchaseOrderStatus;

  @Column({ nullable: true })
  expectedDeliveryDate?: Date;

  @Column()
  currency: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PurchaseOrderItemEntity, (item) => item.purchaseOrder, {
    cascade: ['insert', 'update'],
  })
  items: PurchaseOrderItemEntity[];
}
