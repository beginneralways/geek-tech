import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Packages } from './entities/package.entity';
import { PackageController } from './package.controller';
import { PackagesService } from './package.service';
import { ItemService } from '../item/item.service';
import { Item } from 'src/item/entities/item.entity';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Packages,Item,Order

    ]),
  ],
  controllers: [PackageController],
  providers: [PackagesService, ItemService], 
  exports: [PackagesService], 
})
export class PackageModule {}
