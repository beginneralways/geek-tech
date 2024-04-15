import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Include only the User entity here
     
        // forwardRef(() => AuthModule), // Import AuthModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService], //only if this module is imported by other modules
})
export class UsersModule {}
