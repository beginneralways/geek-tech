import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlConfigService } from './config/mysql.config';
import { ItemModule } from './item/item.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MySqlConfigService
    }),
  ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
