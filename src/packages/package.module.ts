import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Packages } from './entities/package.entity';
import { PackageController } from './package.controller';
import { PackagesService } from './package.service';
import { ItemModule } from '../item/item.module';
import { ItemService } from '../item/item.service';
import { Item } from 'src/item/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Packages,Item

    ]),
  
    
  
  ],
  controllers: [PackageController],
  providers: [PackagesService, ItemService], // Ensure ItemService is provided
  exports: [PackagesService], // Optionally export services
})
export class PackageModule {}
