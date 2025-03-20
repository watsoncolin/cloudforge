import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsEnum,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RFQStatus, UnitOfMeasure, Material, ProcessingType } from 'src/enums';
import { DimensionsDto } from 'src/modules/purchase-orders/dto/purchase-order-item.dto';

export class UpdateRFQItemDto {
  @ApiProperty({ description: 'The item ID' })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ description: 'The item material type', enum: Material })
  @IsEnum(Material)
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

export class UpdateRFQDto {
  @ApiProperty({ description: 'The RFQ ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The customer ID' })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ description: 'The RFQ notes' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'The RFQ items',
    type: [UpdateRFQItemDto],
  })
  @IsArray()
  @IsNotEmpty()
  items: UpdateRFQItemDto[];

  @ApiProperty({
    description: 'The RFQ status',
    enum: RFQStatus,
    default: RFQStatus.PENDING,
  })
  @IsEnum(RFQStatus)
  @IsNotEmpty()
  status: RFQStatus = RFQStatus.PENDING;
}
