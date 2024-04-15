// File: auth.service.ts

import { Body, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from 'src/users/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    // Initialize an empty array to store revoked tokens
    private revokedTokens: string[] = [];
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    // Validate user credentials
    async validateUser(@Body() LoginDto: LoginDto): Promise<any> {
        // Find the user based on the email
        const user = await this.userRepository.findOne({
            where: { email: LoginDto.email },
        });

        // If user is found
        if (user) {
            // Compare the hashed password from the database with the hashed version of the provided password
            const isPasswordMatch = bcrypt.compareSync(LoginDto.password, user.password);

            // If passwords match
            if (isPasswordMatch) {
                // Return success response with user data
                return {
                    status: HttpStatus.FOUND,
                    message: 'User found and password matched successfully',
                    data: user,
                };
            } else {
                // Passwords don't match, throw unauthorized exception
                throw new UnauthorizedException('Incorrect password');
            }
        } else {
            // User not found, throw not found exception
            throw new NotFoundException('User not found');
        }
    }

    // Generate JWT access token
    public getJwtAccessToken(tokenPayload: any) {
        return this.jwtService.sign(tokenPayload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    }

    // Generate JWT refresh token
    public getJwtRefreshToken(tokenPayload: any) {
        return this.jwtService.sign(tokenPayload, {
            secret: process.env.REFRESH_JWT_SECRET,
            expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
        });
    }

    // Login service to generate access and refresh tokens
    async login(@Body() loginDto: LoginDto): Promise<any> {
        try {
            // Validate user credentials
            const validatedUserResponse = await this.validateUser(loginDto);

            // If user validation is successful, generate access and refresh tokens
            const payload = {
                email: validatedUserResponse.data.email,
                role: validatedUserResponse.data.roles, // Assuming the role property is available in the user response
                username: validatedUserResponse.data.name,
                userId: validatedUserResponse.data.id,
            };

            // Generate access and refresh tokens
            const accessToken = this.getJwtAccessToken(payload);
            const refreshToken = this.getJwtRefreshToken(payload);

            // Return tokens and user data
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                user: validatedUserResponse.data,
            };
        } catch (error) {
            // Handle any errors thrown during user validation
            throw error; // You can customize error handling as per your requirements
        }
    }

    async logout(accessToken: string, refreshToken: string) {
        try {
            // Add both access and refresh tokens to the revoked tokens array
            this.revokedTokens.push(accessToken, refreshToken);

            // Optionally, you can perform additional cleanup or revoke operations here

            return { message: 'Logout successful' };
        } catch (error) {
            throw new Error('Logout failed');
        }
    }

    // Method to check if a token is revoked
    isTokenRevoked(token: string): boolean {
        return this.revokedTokens.includes(token);
    }
}
