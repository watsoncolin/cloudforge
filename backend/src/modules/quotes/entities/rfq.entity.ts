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
import { RFQItemEntity } from './rfq-item.entity';
import { RFQStatus, RFQSource } from 'src/enums';

@Entity()
export class RFQEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.rfqs, { eager: true })
  customer: CustomerEntity;

  @Column({ type: 'varchar', length: 255 })
  readableId: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => RFQItemEntity, (item) => item.rfq, { cascade: true })
  items: RFQItemEntity[];

  @Column({ type: 'enum', enum: RFQStatus, default: RFQStatus.PENDING })
  status: RFQStatus;

  @Column({ type: 'enum', enum: RFQSource, default: RFQSource.MANUAL })
  source: RFQSource;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
