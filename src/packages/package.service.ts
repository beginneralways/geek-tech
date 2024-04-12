import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Packages } from './entities/package.entity';
import { Item } from '../item/entities/item.entity';
import { PackageDto } from './dto/create-package.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Packages)
    private readonly packageRepository: Repository<Packages>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async createPackages(packageDto: PackageDto): Promise<Packages[]> {
    const { selectedItems } = packageDto;

    // Fetch items based on the provided item IDs
const items = await this.itemRepository.find({ where: { id: In(selectedItems) } });

    // Calculate total weight and total price of the items
    let totalWeight = 0;
    let totalPrice = 0;
    for (const item of items) {
      totalWeight += item.weight;
      totalPrice += item.price;
    }

    // Calculate courier price based on total weight
    const courierPrice = this.calculateCourierPrice(totalWeight);

    // Create a new package with the provided data
    const newPackage = new Packages();
  
    newPackage.totalWeight = totalWeight;
    newPackage.totalPrice = totalPrice;
    newPackage.courierPrice = courierPrice;

    // Save the new package to the database
    const createdPackage = await this.packageRepository.save(newPackage);

    // Return the created package
    return [createdPackage];
  }

  private calculateCourierPrice(totalWeight: number): number {
    // Your logic to calculate courier price based on total weight
    // For example:
    const baseRate = 10; // Base rate for shipping
    const ratePerKg = 5; // Rate per kilogram for additional weight
    return baseRate + ratePerKg * Math.ceil(totalWeight / 1000); // Assuming weight is in grams, converting to kilograms
  }
}
