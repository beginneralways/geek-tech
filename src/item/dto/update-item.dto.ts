import { PartialType } from '@nestjs/swagger';
import { ItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(ItemDto) {}
