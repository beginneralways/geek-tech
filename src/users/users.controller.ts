import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, ConsoleLogger, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiOperation, ApiBadRequestResponse, ApiParam, ApiOkResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';



@Controller('users')
@ApiTags('Users') // Add this decorator to group endpoints in Swagger UI
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Create User' })
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