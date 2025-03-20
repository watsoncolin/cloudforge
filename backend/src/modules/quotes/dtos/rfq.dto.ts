import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsEnum,
  IsDate,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  RFQStatus,
  RFQSource,
  UnitOfMeasure,
  Material,
  ProcessingType,
} from 'src/enums';
import { CustomerDto } from 'src/modules/customers/dtos/customer.dto';
import { DimensionsDto } from 'src/modules/purchase-orders/dto/purchase-order-item.dto';

export class RFQItemDto {
  @ApiProperty({ description: 'The item ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The item inventory item id' })
  @IsString()
  @IsNotEmpty()
  materialType: Material;

  @ApiProperty({
    description: 'The item processing type',
    enum: ProcessingType,
  })
  @IsEnum(ProcessingType)
  @IsNotEmpty()
  processingType: ProcessingType;

  @ApiProperty({ description: 'The item grade' })
  @IsString()
  @IsNotEmpty()
  grade: string;

  @ApiProperty({ description: 'The item dimensions', type: DimensionsDto })
  @IsObject()
  @IsNotEmpty()
  dimensions: DimensionsDto;

  @ApiProperty({ description: 'The item quantity' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'The item unit of measure', enum: UnitOfMeasure })
  @IsEnum(UnitOfMeasure)
  @IsNotEmpty()
  unitOfMeasure: UnitOfMeasure;

  @ApiProperty({ description: 'The item price' })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'The item total' })
  @IsNumber()
  @IsOptional()
  total?: number;
}

export class RFQDto {
  @ApiProperty({ description: 'The RFQ ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The readable ID' })
  @IsString()
  @IsNotEmpty()
  readableId: string;

  @ApiProperty({ description: 'The customer ID' })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ description: 'The customer dto', type: CustomerDto })
  @IsObject()
  @IsNotEmpty()
  customer: CustomerDto;

  @ApiProperty({ description: 'The RFQ notes' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'The RFQ items',
    type: [RFQItemDto],
  })
  @IsArray()
  @IsNotEmpty()
  items: RFQItemDto[];

  @ApiProperty({
    description: 'The RFQ status',
    enum: RFQStatus,
    default: RFQStatus.PENDING,
  })
  @IsEnum(RFQStatus)
  @IsNotEmpty()
  status: RFQStatus = RFQStatus.PENDING;

  @ApiProperty({
    description: 'The RFQ source',
    enum: RFQSource,
    default: RFQSource.MANUAL,
  })
  @IsEnum(RFQSource)
  @IsNotEmpty()
  source: RFQSource = RFQSource.MANUAL;

  @ApiProperty({ description: 'The RFQ created at' })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ description: 'The RFQ updated at' })
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
