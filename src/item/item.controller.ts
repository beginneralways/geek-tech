import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto } from './dto/create-item.dto';
// import { UpdateItemDto } from './dto/update-item.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Item } from './entities/item.entity';

@Controller('item')
@ApiTags('Item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @ApiOperation({ summary: 'Create single Item' })
    @ApiBody({ type: ItemDto })
    @Post()
    create(@Body() ItemDto: ItemDto): Promise<ItemDto> {
        return this.itemService.createItem(ItemDto);
    }
  


  @ApiOperation({ summary: 'Create Multiple Items' })
  @ApiBody({ type: [ItemDto] })
   @Post('batch')
  async createMultipleItems(@Body() ItemDto: ItemDto[]): Promise<Item[]> {
    return this.itemService.createMultipleItems(ItemDto);
  }
}


  

