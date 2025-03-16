import { IsEmail, IsOptional } from "class-validator";

import { IsNotEmpty } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ContactDto {
  @ApiProperty({ description: 'The name of the contact' })  
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The email address of the contact' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The phone number of the contact' })
  @IsString()
  @IsOptional()
  phone?: string;
}
