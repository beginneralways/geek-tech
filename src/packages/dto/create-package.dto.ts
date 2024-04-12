import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Packages')
export class PackageDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiHideProperty()
  selectedItems: number[];

  @ApiHideProperty()
  totalWeight: number;

  @ApiHideProperty()
  totalPrice: number;


  @ApiProperty({ type: [Number] })
  courierPrice: number;
}
