import { ApiProperty } from '@nestjs/swagger';

export class WarehouseLocation {
  @ApiProperty({ description: 'The warehouse of the location' })
  warehouse: string;

  @ApiProperty({ description: 'The zone of the location' })
  zone: string;

  @ApiProperty({ description: 'The bin of the location' })
  bin: string;
}
