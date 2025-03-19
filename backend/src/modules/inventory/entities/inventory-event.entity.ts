import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { InventoryEntity } from './inventory.entity';
import { InventoryEventType } from 'src/enums';

@Entity('inventory_events')
export class InventoryEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => InventoryEntity, (inventory) => inventory.events)
  inventory: InventoryEntity;

  @Column()
  eventType: InventoryEventType;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  purchaseOrderId?: string;

  @Column({ nullable: true })
  salesOrderId?: string;

  @Column({ nullable: true })
  batchId?: string;

  @Column()
  createdAt: Date;
}
