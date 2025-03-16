import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsArray } from 'class-validator';
import { PurchaseOrderStatus } from 'src/domain';
import { PurchaseOrderItemDto } from './purchase-order-item.dto';

export class UpdatePurchaseOrderDto {
  @ApiProperty({ description: 'The unique identifier of the purchase order' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The supplier id' })
  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @ApiProperty({ description: 'The order date' })
  @IsString()
  @IsNotEmpty()
  orderDate: string;

  @ApiProperty({ description: 'The status of the purchase order' })
  @IsEnum(PurchaseOrderStatus)
  @IsNotEmpty()
  status: PurchaseOrderStatus;

  @ApiProperty({ description: 'The items in the purchase order' })
  @IsArray()
  @IsNotEmpty()
  items: PurchaseOrderItemDto[];

  @ApiProperty({ description: 'The expected delivery date' })
  @IsString()
  @IsNotEmpty()
  expectedDeliveryDate: string;
}
