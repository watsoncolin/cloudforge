import { IsString, IsNotEmpty, IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactDto, AddressDto } from 'src/shared/dto';
import { PaymentTerms } from 'src/enums/payment-terms.enum';
export class CustomerDto {
  @ApiProperty({ description: 'The unique identifier of the customer' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The name of the customer company' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The contact information of the customer' })
  @IsNotEmpty()
  contact: ContactDto;

  @ApiProperty({ description: 'The address of the customer' })
  @IsNotEmpty()
  address: AddressDto;

  @ApiProperty({ description: 'The payment terms for the customer' })
  @IsEnum(PaymentTerms)
  @IsNotEmpty()
  paymentTerms: PaymentTerms;

  @ApiProperty({ description: 'The creation date of the customer' })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ description: 'The update date of the customer' })
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
