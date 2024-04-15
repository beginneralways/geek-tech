import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/users/dto/login.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
import { LocalStrategy } from './local.strategy';

@Controller('auth')
@ApiTags('Auth')
// @ApiBearerAuth()

export class AuthController {
    constructor(private authService: AuthService) {}
    //login
    @ApiOperation({ summary: 'Login User' })
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully logged in.',
    })
    @ApiBadRequestResponse({ description: 'Invalid input.' })
    @Post('validate')
    // @UseGuards(JwtAuthGuard)
    // @Roles(RoleEnum.ALL)
    async validate(@Body() loginDto: LoginDto) {
        return await this.authService.validateUser(loginDto);
    }

    @ApiOperation({ summary: 'Refresh Token' })
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully logged in.',
    })
    @ApiBadRequestResponse({ description: 'Invalid input.' })
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }
}
