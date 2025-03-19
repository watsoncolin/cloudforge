import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
} from 'class-validator';
import { PurchaseOrderStatus } from 'src/domain';
import { PurchaseOrderItemDto } from './purchase-order-item.dto';

export class PurchaseOrderDto {
  @ApiProperty({ description: 'The unique identifier of the purchase order' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The readable identifier of the purchase order' })
  @IsString()
  @IsNotEmpty()
  readableId: string;

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

  @ApiProperty({ description: 'The total price of the purchase order' })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({ description: 'The currency of the purchase order' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ description: 'The expected delivery date' })
  @IsString()
  @IsNotEmpty()
  expectedDeliveryDate: string;

  @ApiProperty({ description: 'The created at date' })
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ description: 'The updated at date' })
  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}
