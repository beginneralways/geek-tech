import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlConfigService } from './config/mysql.config';
import { ItemModule } from './item/item.module';
import { PackageModule } from './packages/package.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MySqlConfigService
    }),
  ItemModule,
  PackageModule,
  OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
