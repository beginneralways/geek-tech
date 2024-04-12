// product.entity.ts

import { Packages } from 'src/packages/entities/package.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  weight: number;

  @ManyToMany(() => Packages)
  @JoinTable()
  packages: Packages[];
}
