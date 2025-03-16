import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PurchaseOrderEntity } from './purchase-order.entity';
import { UnitOfMeasure } from 'src/enums';
@Entity('purchase_order_items')
export class PurchaseOrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  materialType: string;

  @Column()
  grade: string;

  @Column()
  dimensions: string;

  @Column()
  quantity: number;

  @Column()
  unitOfMeasure: UnitOfMeasure;

  @Column()
  unitPrice: number;

  @Column()
  totalPrice: number;

  @ManyToOne(() => PurchaseOrderEntity, (purchaseOrder) => purchaseOrder.items)
  purchaseOrder: PurchaseOrderEntity;
}
