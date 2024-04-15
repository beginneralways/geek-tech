import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Call the parent canActivate method to perform JWT token validation
        const canActivate = await super.canActivate(context);

        // If canActivate is false, it means the JWT token is invalid or missing
        if (!canActivate) {
            throw new UnauthorizedException('Invalid or missing JWT token');
        }

        // If canActivate is true, the JWT token is valid, and the request can proceed
        return true;
    }
}
