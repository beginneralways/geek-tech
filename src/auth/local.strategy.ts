// File: local.strategy.ts

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    // Validate function to authenticate user credentials
    async validate(LoginDto: { email: string; password: string }): Promise<any> {
        // Validate user credentials using the AuthService
        const user = await this.authService.validateUser(LoginDto);

        // If user is not found, throw an UnauthorizedException
        if (!user) {
            throw new UnauthorizedException();
        }

        // Return the authenticated user
        return user;
    }
}
