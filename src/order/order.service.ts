// order.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDto } from './dto/create-order.dto';


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

async createOrder(createOrderDto: OrderDto) {
  const newOrder = new Order();
  newOrder.customerName = createOrderDto.customerName;
  return await this.orderRepository.save(newOrder);
}


 
}
