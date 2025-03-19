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
  QuoteStatus,
} from 'src/enums';
import { CustomerDto } from 'src/modules/customers/dtos/customer.dto';
import { DimensionsDto } from 'src/modules/purchase-orders/dto/purchase-order-item.dto';

export class QuoteItemDto {
  @ApiProperty({ description: 'The item ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The item inventory item id' })
  @IsString()
  @IsNotEmpty()
  materialType: Material;

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

export class QuoteDto {
  @ApiProperty({ description: 'The quote ID' })
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

  @ApiProperty({ description: 'The quote notes' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'The quote items',
    type: [QuoteItemDto],
  })
  @IsArray()
  @IsNotEmpty()
  items: QuoteItemDto[];

  @ApiProperty({
    description: 'The quote status',
    enum: QuoteStatus,
    default: QuoteStatus.PENDING,
  })
  @IsEnum(QuoteStatus)
  @IsNotEmpty()
  status: QuoteStatus = QuoteStatus.PENDING;

  @ApiProperty({ description: 'The quote created at' })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ description: 'The quote updated at' })
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
