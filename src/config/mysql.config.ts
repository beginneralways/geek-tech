import { Injectable } from '@nestjs/common';
import { TypeOrmModule, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Injectable()
export class MySqlConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ['dist/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: true,
            supportBigNumbers: true,

            bigNumberStrings: true,
        };
    }
}
