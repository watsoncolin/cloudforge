import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class WarehouseLocationDto {
  @ApiProperty({ description: 'The unique identifier of the warehouse' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The name of the warehouse' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The zone of the warehouse' })
  @IsString()
  @IsNotEmpty()
  zone: string;

  @ApiProperty({ description: 'The bin of the warehouse' })
  @IsString()
  @IsNotEmpty()
  bin: string;
}

export class ReceivePurchaseOrderDto {
  @ApiProperty({
    description:
      'The unique identifier of the purchase order line item from the purchase order',
  })
  @IsString()
  @IsNotEmpty()
  purchaseOrderItemId: string;

  @ApiProperty({
    description:
      'The batch number from the supplier of the purchase order item',
  })
  @IsString()
  @IsNotEmpty()
  batchNumber: string;

  @ApiProperty({
    description: 'The warehouse location',
    type: WarehouseLocationDto,
  })
  @IsObject()
  @IsNotEmpty()
  warehouseLocation: WarehouseLocationDto;

  @ApiProperty({ description: 'The heat number of the purchase order item' })
  @IsString()
  @IsNotEmpty()
  heatNumber: string;

  @ApiProperty({ description: 'The mill cert url of the purchase order item' })
  @IsString()
  @IsNotEmpty()
  millCertUrl: string;
}
