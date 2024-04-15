import { Item } from 'src/item/entities/item.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('Packages')
export class Packages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { nullable: true })
  totalWeight: number;

  @Column('decimal', {  nullable: true })
  totalPrice: number;

  @Column('decimal', {  nullable: true })
  courierPrice: number;







  
}
