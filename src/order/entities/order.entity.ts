// order.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Packages } from 'src/packages/entities/package.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  // @OneToMany(() => Packages, (packages) => packages.order)
  // packages: Packages[];

  @Column()
  totalPrice: number;

  @Column()
  courierPrice: number;

  // @Column()
  // package: string;
}
