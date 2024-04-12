import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackagesService } from '../packages/package.service'
import { PackageDto } from './dto/create-package.dto';
import { Order } from 'src/order/entities/order.entity';
import { Item } from 'src/item/entities/item.entity';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
// import { UpdatePackageDto } from './dto/update-package.dto';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackagesService) {}

  @Post()
  @ApiOperation({summary: 'Create Package'})
  @ApiBody({type: PackageDto})
  create(@Body() PackageDto: PackageDto) {
    return this.packageService.createPackages(PackageDto);
  }

 
}
