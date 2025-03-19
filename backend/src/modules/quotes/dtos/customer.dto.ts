import { IsString, IsNotEmpty, IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactDto, AddressDto } from 'src/shared/dto';
import { PaymentTerm } from 'src/enums';
export class CustomerDto {
  @ApiProperty({ description: 'The unique identifier of the customer' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The readable identifier of the customer' })
  @IsString()
  @IsNotEmpty()
  readableId: string;

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
  @IsEnum(PaymentTerm)
  @IsNotEmpty()
  paymentTerm: PaymentTerm;

  @ApiProperty({ description: 'The creation date of the customer' })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ description: 'The update date of the customer' })
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
