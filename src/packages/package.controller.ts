import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PackagesService } from '../packages/package.service'
import { PackageDto } from './dto/create-package.dto';
import { Order } from 'src/order/entities/order.entity';
import { Item } from 'src/item/entities/item.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
// import { UpdatePackageDto } from './dto/update-package.dto';

@Controller('package')
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

