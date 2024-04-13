import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Packages')
export class PackageDto {
  @PrimaryGeneratedColumn()
  id: number;

  // @ApiProperty({default: [1, 2, 3]})
  // selectedItems: number[];

  @ApiProperty({default: [1, 2, 3]})
  @IsArray()
  Ids: number[];

  @ApiHideProperty()
  totalWeight: number;

  @ApiHideProperty()
  totalPrice: number;


  @ApiHideProperty()
  courierPrice: number;
}
