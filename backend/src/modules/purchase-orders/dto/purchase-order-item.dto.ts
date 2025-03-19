import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { Material, UnitOfMeasure } from 'src/enums';

export class DimensionsDto {
  @ApiProperty({
    description: 'The thickness of the material',
    type: Number,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  thickness: number;

  @ApiProperty({
    description: 'The width of the material',
    type: Number,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @ApiProperty({
    description: 'The length of the material',
    type: Number,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  length: number;
}

export class PurchaseOrderItemDto {
  @ApiProperty({
    description: 'The unique identifier of the purchase order item',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The material type', enum: Material })
  @IsEnum(Material)
  @IsNotEmpty()
  materialType: Material;

  @ApiProperty({ description: 'The grade of the material' })
  @IsString()
  @IsNotEmpty()
  grade: string;

  @ApiProperty({
    description: 'The dimensions of the material',
    type: DimensionsDto,
  })
  @IsNotEmpty()
  dimensions: DimensionsDto;

  @ApiProperty({ description: 'The quantity of the material' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'The unit of measure', enum: UnitOfMeasure })
  @IsEnum(UnitOfMeasure)
  @IsNotEmpty()
  unitOfMeasure: UnitOfMeasure;

  @ApiProperty({ description: 'The unit price of the material' })
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @ApiProperty({ description: 'The total price of the material' })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
