import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/create-order.dto';
import { ApiExcludeController, ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiExcludeEndpoint()
  create(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }

 
}
