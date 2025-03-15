import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({ description: 'The unique identifier of the customer' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The name of the customer company' })
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

  @ApiPropertyOptional({
    description: 'The phone number of the primary contact',
  })
  @IsString()
  @IsOptional()
  contactPhone?: string;

  @ApiProperty({ description: 'The street address of the customer' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'The city where the customer is located' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'The country where the customer is located' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'The state or province where the customer is located',
  })
  @IsString()
  @IsNotEmpty()
  stateProvince: string;

  @ApiProperty({ description: 'The postal/ZIP code of the customer' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({
    description: 'The payment terms for the customer',
    example: 'Net 30',
    enum: ['Net 15', 'Net 30', 'Net 45', 'Net 60'],
  })
  @IsString()
  @IsNotEmpty()
  paymentTerms: string;
}
