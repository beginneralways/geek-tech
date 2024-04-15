import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// create a jwt service to get access and refresh tokens
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        // Here you can set up the payload as needed
        const { userId, username, email, roles } = payload;

        // Validate if userId exists
        if (!userId) {
            throw new UnauthorizedException('Invalid token payload');
        }

        // You can perform additional validation or logic here

        // Return the validated payload
        return {
            userId,
            username,
            email,
            roles,
        };
    }
}
