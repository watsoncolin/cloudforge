import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('customers')
export class Customer {
  @ApiProperty({ description: 'The unique identifier of the customer' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the customer company' })
  @Column()
  name: string;

  @ApiProperty({ description: 'The name of the primary contact person' })
  @Column()
  contactName: string;

  @ApiProperty({ description: 'The email address of the primary contact' })
  @Column()
  contactEmail: string;

  @ApiProperty({
    description: 'The phone number of the primary contact',
    required: false,
  })
  @Column({ nullable: true })
  contactPhone: string;

  @ApiProperty({ description: 'The street address of the customer' })
  @Column()
  address: string;

  @ApiProperty({ description: 'The city where the customer is located' })
  @Column()
  city: string;

  @ApiProperty({ description: 'The country where the customer is located' })
  @Column()
  country: string;

  @ApiProperty({
    description: 'The state or province where the customer is located',
  })
  @Column()
  stateProvince: string;

  @ApiProperty({ description: 'The postal/ZIP code of the customer' })
  @Column()
  zipCode: string;

  @ApiProperty({
    description: 'The payment terms for the customer',
    example: 'Net 30',
    enum: ['Net 15', 'Net 30', 'Net 45', 'Net 60'],
  })
  @Column()
  paymentTerms: string;

  @ApiProperty({ description: 'The timestamp when the customer was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the customer was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
