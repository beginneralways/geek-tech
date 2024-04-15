
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Body, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
       
    ) {}

    async create(createUserDto: CreateUserDto): Promise<any> {
        const user = this.userRepository.create(createUserDto);
        return {
            data: await this.userRepository.save(user),
        };
    }

    

    async login(@Body() LoginDto: LoginDto): Promise<any> {
        // Hash the password from LoginDto
        const hashedPassword = bcrypt.hashSync(LoginDto.password, 10);

        // Find the user based on the email
        const user = await this.userRepository.findOne({
            where: { email: LoginDto.email },
        });

        if (user) {
            // Compare the hashed password from the database with the hashed version of the provided password
            const isPasswordMatch = bcrypt.compareSync(LoginDto.password, user.password);

            if (isPasswordMatch) {
                // Passwords match, return success response
                return {
                    status: HttpStatus.FOUND,
                    message: 'User found and password matched successfully',
                    data: user,
                };
            } else {
                // Passwords don't match, throw error
                throw new UnauthorizedException('Incorrect password');
            }
        } else {
            // User not found, throw error
            throw new NotFoundException('User not found');
        }
    }
  }
