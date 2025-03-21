import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RFQEntity } from './rfq.entity';
import { UnitOfMeasure, Material, ProcessingType } from 'src/enums';
@Entity()
export class RFQItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RFQEntity, (rfq) => rfq.items, { onDelete: 'CASCADE' })
  rfq: RFQEntity;

  @Column({ type: 'enum', enum: Material })
  materialType: Material; // e.g., Steel Coil, Aluminum Sheet

  @Column({ type: 'enum', enum: ProcessingType })
  processingType: ProcessingType; // e.g., HRB, HRPO, CR

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

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price?: number; // Price per unit

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total?: number; // Total price
}
