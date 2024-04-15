import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PackagesService } from '../packages/package.service'
import { PackageDto } from './dto/create-package.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';



@Controller('package')
@ApiTags('Create Package and Order')
export class PackageController {
  constructor(private readonly packageService: PackagesService) {}

  @Post()
  @ApiOperation({summary: 'Create Package'})
  @ApiBody({type: PackageDto["Ids"]})
  create(@Body() request: { Ids: any, customerName: string }) {
    const { Ids, customerName } = request;
    return this.packageService.createPackagesAndOrder(customerName, Ids);
  }
}

