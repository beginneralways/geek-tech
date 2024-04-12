import { Injectable } from '@nestjs/common';
import { ItemDto } from './dto/create-item.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>

  ){}

  // async createItem(item: ItemDto) {
  //   const newItem = new ItemDto();
  //   newItem.name = item.name;
  //   newItem.price = item.price;
  //   newItem.weight = item.weight;
  //   return await this.itemRepository.save(newItem);
  // }
async createItem(item: ItemDto) {
  
  const newItem = this.itemRepository.create(item);
  return await this.itemRepository.save(newItem);
}
   async createMultipleItems(itemsDto: ItemDto[]): Promise<Item[]> {
    const items: Item[] = [];

    for (const itemDto of itemsDto) {
      const item = this.itemRepository.create(itemDto);
      items.push(await this.itemRepository.save(item));
    }

    return items;
  }


}
