import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { UnitOfMeasure, Material } from 'src/enums';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  order: OrderEntity;

  @Column({ type: 'enum', enum: Material })
  materialType: Material; // e.g., Steel Coil, Aluminum Sheet

  @Column({ type: 'varchar', length: 100 })
  grade: string; // e.g., 316 Stainless Steel

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  width: number; // Width of the material

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  length: number; // Length of the material

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  thickness: number; // Thickness of the material

  @Column({ type: 'enum', enum: UnitOfMeasure })
  unitOfMeasure: UnitOfMeasure; // e.g., CWT, lbs, ft, pieces

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number; // Requested quantity

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number; // Price per unit

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number; // Total price
}
