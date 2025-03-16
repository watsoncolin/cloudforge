import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { UnitOfMeasure } from 'src/enums';

export class PurchaseOrderItemDto {
  @ApiProperty({
    description: 'The unique identifier of the purchase order item',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The material type' })
  @IsString()
  @IsNotEmpty()
  materialType: string;

  @ApiProperty({ description: 'The grade of the material' })
  @IsString()
  @IsNotEmpty()
  grade: string;

  @ApiProperty({ description: 'The dimensions of the material' })
  @IsNotEmpty()
  dimensions: {
    thickness: number;
    width: number;
    length: number;
  };

  @ApiProperty({ description: 'The quantity of the material' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'The unit of measure' })
  @IsEnum(UnitOfMeasure)
  @IsNotEmpty()
  unitOfMeasure: UnitOfMeasure;

  @ApiProperty({ description: 'The unit price of the material' })
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @ApiProperty({ description: 'The total price of the material' })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
