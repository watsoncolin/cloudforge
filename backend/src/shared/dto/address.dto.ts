import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddressDto {
  @ApiProperty({ description: 'The street address of the supplier' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ description: 'The city where the supplier is located' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'The state or province where the supplier is located',
  })
  @IsString()
  @IsNotEmpty()
  stateProvince: string;

  @ApiProperty({ description: 'The postal/ZIP code of the supplier' })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ description: 'The country where the supplier is located' })
  @IsString()
  @IsNotEmpty()
  country: string;
}
