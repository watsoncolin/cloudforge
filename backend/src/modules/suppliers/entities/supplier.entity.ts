import { Material, PaymentTerm } from 'src/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InventoryBatchEntity } from 'src/modules/inventory/entities/inventory-batch.entity';

@Entity('suppliers')
export class SupplierEntity {
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

  @Column({ type: 'enum', enum: PaymentTerm })
  paymentTerm: PaymentTerm;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'enum', enum: Material, array: true })
  materials: Material[];

  @OneToMany(() => InventoryBatchEntity, (batch) => batch.supplier)
  batches: InventoryBatchEntity[];
}
