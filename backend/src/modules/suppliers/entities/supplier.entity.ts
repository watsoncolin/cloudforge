import { PaymentTerms } from 'src/enums/payment-terms.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('suppliers')
export class SupplierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contactName: string;

  @Column()
  contactEmail: string;

  @Column()
  contactPhone: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  stateProvince: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  @Column({ type: 'enum', enum: PaymentTerms })
  paymentTerms: PaymentTerms;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
