import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';
import { PackageDto } from 'src/packages/dto/create-package.dto';
// Assuming PackageDto is defined in a package DTO file

export class OrderDto {

  @ApiProperty({ example: 'John Doe', description: 'Customer name' })
  @IsString()
  customerName: string;

  @ApiProperty({ type: [PackageDto] })
  @IsArray()
  packages: PackageDto[]; // Assuming PackageDto is defined correctly
}
