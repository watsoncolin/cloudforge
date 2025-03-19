import { UnitOfMeasure, OrderStatus } from 'src/enums';
import { ApiProperty } from '@nestjs/swagger';
import { InventoryDto } from 'src/modules/inventory/dto/inventory.dto';
import { BatchDto } from 'src/modules/inventory/dto/batch.dto';
export class OrderItemDto {
  @ApiProperty({ description: 'The ID of the order item' })
  id: string;

  @ApiProperty({
    description: 'The ID of the inventory that the order item is for',
  })
  inventoryId: string;

  @ApiProperty({
    description: 'The inventory that the order item is for',
  })
  inventory: InventoryDto;

  @ApiProperty({
    description: 'The IDs of the batches that the order item is for',
  })
  batchIds: string[];

  @ApiProperty({ description: 'The quantity of the order item' })
  quantity: number;

  @ApiProperty({ description: 'The unit of measure of the order item' })
  unitOfMeasure: UnitOfMeasure;

  @ApiProperty({ description: 'The price of the order item' })
  price: number;

  @ApiProperty({ description: 'The total price of the order item' })
  total: number;

  @ApiProperty({
    description: 'The batches of the order item',
    type: [BatchDto],
  })
  batches: BatchDto[];
}

export class OrderDto {
  @ApiProperty({ description: 'The ID of the order' })
  id: string;

  @ApiProperty({ description: 'The readable ID of the order' })
  readableId: string;

  @ApiProperty({
    description: 'The ID of the quote that the order is based on',
  })
  quoteId: string;

  @ApiProperty({
    description: 'The status of the order',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ApiProperty({ description: 'The ID of the customer that the order is for' })
  customerId: string;

  @ApiProperty({
    description: 'The items in the order',
    type: [OrderItemDto],
  })
  items: OrderItemDto[];

  @ApiProperty({ description: 'The date and time the order was created' })
  createdAt: Date;

  @ApiProperty({ description: 'The date and time the order was updated' })
  updatedAt: Date;
}
