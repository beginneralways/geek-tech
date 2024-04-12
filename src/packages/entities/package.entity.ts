import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Packages')
export class Packages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array', { nullable: true })
  selectedItems: number[];

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  totalWeight: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  totalPrice: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  courierPrice: number;
}
