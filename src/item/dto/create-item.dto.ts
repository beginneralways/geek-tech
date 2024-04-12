// product.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ItemDto {

  @ApiProperty({ description: 'Name of the item' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Price of the item' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Weight of the item in gm' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  weight: number;
}
