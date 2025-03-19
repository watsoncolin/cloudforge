import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IsNotEmpty } from 'class-validator';

export class UpdateBatchLocationDto {
  @ApiProperty({ description: 'The warehouse of the batch' })
  @IsString()
  @IsNotEmpty()
  warehouse: string;

  @ApiProperty({ description: 'The zone of the batch' })
  @IsString()
  @IsNotEmpty()
  zone: string;

  @ApiProperty({ description: 'The bin of the batch' })
  @IsString()
  @IsNotEmpty()
  bin: string;
}
