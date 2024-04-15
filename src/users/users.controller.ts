import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiOperation, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';



@Controller('users')
@ApiTags('Users') 
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Register User' })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.',
    })
    @ApiBadRequestResponse({ description: 'Invalid input.' })
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }
  }