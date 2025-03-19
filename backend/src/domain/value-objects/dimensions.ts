import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { IsNumber } from 'class-validator';

export class Dimensions {
  @ApiProperty({ description: 'The length of the dimensions' })
  @IsNumber()
  @IsNotEmpty()
  length: number;

  @ApiProperty({ description: 'The width of the dimensions' })
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @ApiProperty({ description: 'The thickness of the dimensions' })
  @IsNumber()
  @IsNotEmpty()
  thickness: number;
}
