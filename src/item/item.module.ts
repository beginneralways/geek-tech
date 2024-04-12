import { Module, forwardRef } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { PackageModule } from 'src/packages/package.module';


@Module({
  imports: [TypeOrmModule.forFeature([Item]),
forwardRef(() => PackageModule),],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
