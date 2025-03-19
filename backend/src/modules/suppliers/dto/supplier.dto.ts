import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsArray, IsDate } from 'class-validator';
import { Material, PaymentTerm } from 'src/enums';
import { ContactDto, AddressDto } from 'src/shared/dto';

export class SupplierDto {
  @ApiProperty({ description: 'The unique identifier of the supplier' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The readable identifier of the supplier' })
  @IsString()
  @IsNotEmpty()
  readableId: string;

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
  @IsEnum(PaymentTerm)
  @IsNotEmpty()
  paymentTerm: PaymentTerm;

  @ApiProperty({ description: 'The materials the supplier can provide' })
  @IsArray()
  @IsEnum(Material, { each: true })
  materials: Material[];

  @ApiProperty({ description: 'The creation date of the supplier' })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ description: 'The update date of the supplier' })
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
