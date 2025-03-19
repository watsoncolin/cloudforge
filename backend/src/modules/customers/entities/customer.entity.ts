import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PaymentTerm } from 'src/enums';
import { RFQEntity } from 'src/modules/quotes/entities/rfq.entity';
import { QuoteEntity } from 'src/modules/quotes/entities/quote.entity';
import { OrderEntity } from 'src/modules/orders/entities/order.entity';
@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  readableId: string;

  @Column()
  name: string;

  @Column()
  contactName: string;

  @Column()
  contactEmail: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  stateProvince: string;

  @Column()
  postalCode: string;

  @Column({
    type: 'enum',
    enum: PaymentTerm,
  })
  paymentTerm: PaymentTerm;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => RFQEntity, (rfq) => rfq.customer)
  rfqs: RFQEntity[];

  @OneToMany(() => QuoteEntity, (quote) => quote.customer)
  quotes: QuoteEntity[];

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];
}
