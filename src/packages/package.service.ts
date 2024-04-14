import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../item/entities/item.entity';
import { Packages } from './entities/package.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class PackagesService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        @InjectRepository(Packages)
        private readonly packageRepository: Repository<Packages>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async createPackagesAndOrder(customerName: string, Ids: number[] | { Ids: number[] }): Promise<{ customerName: string, orders: Order[] }> {
        // Create packages
        const packages = await this.createPackages(Ids);

        // Create and save order for each package
        const orders: Order[] = [];
        for (const pkg of packages) {
            const order = new Order();
            order.customerName = customerName;
            // order.package = pkg;
            order.totalPrice = pkg.totalPrice;
            order.courierPrice = pkg.courierPrice;
            await this.orderRepository.save(order);
            orders.push(order);
        }

        return { customerName, orders };
    }

    async createPackages(Ids: number[] | { Ids: number[] }): Promise<Packages[]> {
        // If Ids is an object with an Ids property, extract the array from it
        const idsArray = Array.isArray(Ids) ? Ids : (Ids as { Ids: number[] }).Ids;

        // Check if idsArray is an array
        if (!Array.isArray(idsArray)) {
            throw new Error('Input is not an array');
        }

        // Initialize packages array
        const packages: Packages[] = [];

        // Initialize current package variables
        let currentPackageTotalPrice = 0;
        let currentPackageTotalWeight = 0;
        let currentPackageItems: Item[] = [];

        // Iterate through the provided IDs
        for (const id of idsArray) {
            // Fetch the item from the database
            const item = await this.itemRepository.findOneBy({id});
            if (!item) {
                throw new NotFoundException(`Item with ID ${id} not found`);
            }

            // Check if adding the current item would exceed the price limit ($250)
            if (currentPackageTotalPrice + parseFloat(item.price.toString()) > 250) {
                // If yes, create a new package
                const newPackage = new Packages();
                newPackage.totalPrice = currentPackageTotalPrice;
                newPackage.totalWeight = currentPackageTotalWeight;
                newPackage.items = currentPackageItems;
                packages.push(newPackage);

                // Reset current package variables for the next package
                currentPackageTotalPrice = 0;
                currentPackageTotalWeight = 0;
                currentPackageItems = [];
            }

            // Add the item to the current package
            currentPackageTotalPrice += parseFloat(item.price.toString());
            currentPackageTotalWeight += parseFloat(item.weight.toString());
            currentPackageItems.push(item);
        }

        // Add the last package if there are remaining items
        if (currentPackageItems.length > 0) {
            const newPackage = new Packages();
            newPackage.totalPrice = currentPackageTotalPrice;
            newPackage.totalWeight = currentPackageTotalWeight;
            newPackage.items = currentPackageItems;
            packages.push(newPackage);
        }

        // Calculate courier charges for each package based on total weight
        packages.forEach(pkg => {
            pkg.courierPrice = this.calculateCourierPrice(pkg.totalWeight);
        });

        // Save packages to the database
        await this.packageRepository.save(packages);

        return packages;
    }

    private calculateCourierPrice(totalWeight: number): number {
        if (totalWeight <= 200) {
            return 5;
        } else if (totalWeight <= 500) {
            return 10;
        } else if (totalWeight <= 1000) {
            return 15;
        } else {
            return 20;
        }
    }
}
