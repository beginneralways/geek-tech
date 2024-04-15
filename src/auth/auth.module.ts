import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

// import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        // Provide the User entity
        forwardRef(() => UsersModule), // Import UsersModule
        JwtModule.register({
            // Register JwtModule with appropriate options
            secret: process.env.JWT_SECRET, // Your JWT secret key
            signOptions: { expiresIn: '5h' }, // Token expiration time
        }),
    ],

    controllers: [AuthController],
    providers: [AuthService, JwtService, UsersService,JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
