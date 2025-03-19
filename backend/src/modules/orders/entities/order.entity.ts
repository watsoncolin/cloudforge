import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from 'src/modules/customers/entities/customer.entity';
import { OrderItemEntity } from './order-item.entity';
import { OrderStatus } from 'src/enums';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders, {
    eager: true,
  })
  customer: CustomerEntity;

  @Column({ type: 'varchar', length: 255 })
  readableId: string;

  @Column({ type: 'varchar', length: 255 })
  rfqId: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
