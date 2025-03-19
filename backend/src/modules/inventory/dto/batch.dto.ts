import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WarehouseLocation } from 'src/domain/value-objects/warehouse-location';

export class BatchDto {
  @ApiProperty({ description: 'The ID of the batch' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The supplier ID of the batch' })
  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @ApiProperty({ description: 'The purchase order ID of the batch' })
  @IsString()
  @IsNotEmpty()
  purchaseOrderId: string;

  @ApiProperty({ description: 'The purchase order item ID of the batch' })
  @IsString()
  @IsNotEmpty()
  purchaseOrderItemId: string;

  @ApiProperty({
    description: 'The location of the batch',
    type: WarehouseLocation,
  })
  @IsNotEmpty()
  location: WarehouseLocation;

  @ApiProperty({ description: 'The batch number of the batch' })
  @IsString()
  @IsNotEmpty()
  batchNumber: string;

  @ApiProperty({ description: 'The heat number of the batch' })
  @IsString()
  @IsNotEmpty()
  heatNumber: string;

  @ApiProperty({ description: 'The mill certification of the batch' })
  @IsString()
  @IsNotEmpty()
  millCertification: string;

  @ApiProperty({ description: 'The created at of the batch' })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ description: 'The total quantity of the batch' })
  @IsNumber()
  @IsNotEmpty()
  totalQuantity: number;

  @ApiProperty({ description: 'The available quantity of the batch' })
  @IsNumber()
  @IsNotEmpty()
  availableQuantity: number;

  @ApiProperty({ description: 'The allocated quantity of the batch' })
  @IsNumber()
  @IsNotEmpty()
  allocatedQuantity: number;
}
