import { ApiProperty } from '@nestjs/swagger';
import { InventoryDto } from './inventory.dto';
import { BatchDto } from './batch.dto';

export class BatchDetailsResponseDto {
  @ApiProperty({ description: 'The ID of the batch' })
  id: string;

  @ApiProperty({ description: 'The inventory', type: InventoryDto })
  inventory: InventoryDto;

  @ApiProperty({ description: 'The batch', type: BatchDto })
  batch: BatchDto;
}
