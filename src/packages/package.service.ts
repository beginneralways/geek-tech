import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../item/entities/item.entity'; // Import the Item entity
import { PackageDto } from './dto/create-package.dto';
import { Packages } from './entities/package.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    @InjectRepository(Packages)
    private readonly packagesRepository: Repository<Packages>,
  ) {}

  async createPackages(Ids: number[] | { Ids: number[] }): Promise<Item[]> {
    // If Ids is an object with an Ids property, extract the array from it
    const idsArray = Array.isArray(Ids) ? Ids : (Ids as { Ids: number[] }).Ids;

    // Check if idsArray is an array
    if (!Array.isArray(idsArray)) {
      throw new Error('Input is not an array');
    }

    // Convert the array to a Set to remove duplicates, then convert it back to an array of numbers
    const uniqueIds = Array.from(new Set(idsArray));

    const items: Item[] = [];
    for (const id of uniqueIds) {
      // Extract the id property from the items passed as Ids
      const item = await this.itemRepository.findOneBy({ id });
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      items.push(item);
    }

    return items;

    //logic to calculate the total price of items returned

    
  }


// async createPackages(Ids: any): Promise<Item[]> {
//   // If Ids is an object with an Ids property, extract the array from it
//   const idsArray = Array.isArray(Ids) ? Ids : Ids.Ids;

//   // Check if idsArray is an array
//   if (!Array.isArray(idsArray)) {
//     throw new Error('Input is not an array');
//   }

//   // Convert the array to a Set to remove duplicates, then convert it back to an array of numbers
//   const uniqueIds = Array.from(new Set(idsArray));

//   const items: Item[] = [];
//   for (const id of uniqueIds) {
//     // Extract the id property from the items passed as Ids
//     const item = await this.itemRepository.findOneBy({ id });
//     if (!item) {
//       throw new NotFoundException(`Item with ID ${id} not found`);
//     }
//     items.push(item);
//   }

//   return items;
// }





}





  

