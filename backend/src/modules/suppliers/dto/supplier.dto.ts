import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PaymentTerms } from 'src/enums/payment-terms.enum';
import { ContactDto, AddressDto } from 'src/shared/dto';

export class SupplierDto {
  @ApiProperty({ description: 'The unique identifier of the supplier' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The name of the supplier company' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The contact information of the supplier' })
  @IsNotEmpty()
  contact: ContactDto;

  @ApiProperty({ description: 'The address of the supplier' })
  @IsNotEmpty()
  address: AddressDto;

  @ApiProperty({ description: 'The payment terms for the supplier' })
  @IsEnum(PaymentTerms)
  @IsNotEmpty()
  paymentTerms: PaymentTerms;
}
