import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { CustomerEntity } from 'src/modules/customers/entities/customer.entity';
import { QuoteItemEntity } from './quote-item.entity';
import { QuoteStatus, RFQSource } from 'src/enums';
import { OrderEntity } from 'src/modules/orders/entities/order.entity';

@Entity('quotes')
export class QuoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.quotes, {
    eager: true,
  })
  customer: CustomerEntity;

  @Column({ type: 'varchar', length: 255 })
  readableId: string;

  @Column({ type: 'varchar', length: 255 })
  rfqId: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => QuoteItemEntity, (item) => item.quote, { cascade: true })
  items: QuoteItemEntity[];

  @Column({ type: 'enum', enum: QuoteStatus, default: QuoteStatus.PENDING })
  status: QuoteStatus;

  @OneToOne(() => OrderEntity, (order) => order.quote, { cascade: true })
  order: OrderEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
