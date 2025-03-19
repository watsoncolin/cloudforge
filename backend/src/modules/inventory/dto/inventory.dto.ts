import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Dimensions } from 'src/domain/value-objects';
import { BatchDto } from './batch.dto';

export class InventoryDto {
  @ApiProperty({ description: 'The ID of the inventory' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The material type of the inventory' })
  @IsString()
  @IsNotEmpty()
  materialType: string;

  @ApiProperty({ description: 'The grade of the inventory' })
  @IsString()
  @IsNotEmpty()
  grade: string;

  @ApiProperty({
    description: 'The dimensions of the inventory',
    type: Dimensions,
  })
  @IsNotEmpty()
  dimensions: Dimensions;

  @ApiProperty({ description: 'The unit of measure of the inventory' })
  @IsString()
  @IsNotEmpty()
  unitOfMeasure: string;

  @ApiProperty({ description: 'The total quantity of the inventory on hand' })
  @IsNumber()
  @IsNotEmpty()
  totalQuantity: number;

  @ApiProperty({
    description: 'The available quantity of the inventory to be used',
  })
  @IsNumber()
  @IsNotEmpty()
  availableQuantity: number;

  @ApiProperty({
    description:
      'The allocated quantity of the inventory to existing unshipped orders',
  })
  @IsNumber()
  @IsNotEmpty()
  allocatedQuantity: number;

  @ApiProperty({ description: 'The reorder status of the inventory' })
  @IsString()
  @IsNotEmpty()
  reorderStatus: 'Good' | 'Low Stock' | 'Out of Stock';

  @ApiProperty({
    description: 'The batches of the inventory',
    type: [BatchDto],
  })
  @IsArray()
  @IsNotEmpty()
  batches: BatchDto[];
}
