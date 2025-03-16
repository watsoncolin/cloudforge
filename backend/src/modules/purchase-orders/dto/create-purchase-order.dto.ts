import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PurchaseOrderItemDto } from './purchase-order-item.dto';
import { PurchaseOrderStatus } from 'src/domain';

export class CreatePurchaseOrderDto {
  @ApiProperty({ description: 'The supplier id' })
  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @ApiProperty({ description: 'The order date' })
  @IsString()
  @IsNotEmpty()
  orderDate: string;

  @ApiProperty({
    description: 'The status of the purchase order',
    enum: PurchaseOrderStatus,
  })
  @IsEnum(PurchaseOrderStatus)
  @IsNotEmpty()
  status: PurchaseOrderStatus;

  @ApiProperty({
    description: 'The items in the purchase order',
    type: [PurchaseOrderItemDto],
  })
  @IsArray()
  @IsNotEmpty()
  items: PurchaseOrderItemDto[];

  @ApiProperty({
    description: 'The expected delivery date. Format: YYYY-MM-DD',
  })
  @IsNotEmpty()
  @IsString()
  expectedDeliveryDate: string;

  @ApiProperty({ description: 'The currency of the purchase order' })
  @IsString()
  @IsNotEmpty()
  currency: string;
}
