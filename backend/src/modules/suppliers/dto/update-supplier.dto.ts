import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentTerm } from 'src/enums';

export class UpdateSupplierDto {
  @ApiProperty({ description: 'The name of the supplier company' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The name of the primary contact person' })
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @ApiProperty({ description: 'The email address of the primary contact' })
  @IsEmail()
  @IsNotEmpty()
  contactEmail: string;

  @ApiProperty({ description: 'The phone number of the primary contact' })
  @IsString()
  @IsOptional()
  contactPhone?: string;

  @ApiProperty({ description: 'The street address of the supplier' })
  @IsString()
  @IsNotEmpty()
  address: string;

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

  @ApiProperty({
    description: 'The payment terms for the supplier',
    enum: PaymentTerm,
  })
  @IsEnum(PaymentTerm)
  @IsOptional()
  paymentTerm?: PaymentTerm;
}
