import { QueryHandler } from '@nestjs/cqrs';

import { IQueryHandler } from '@nestjs/cqrs';
import { ReadAllInventoryQuery } from './read-all-inventory.query';
import { InventoryRepository } from '../../repositories/inventory.repository';
import { InventoryWithQuantities } from 'src/domain/inventory/inventory-with-quantities';

@QueryHandler(ReadAllInventoryQuery)
export class ReadAllInventoryHandler
  implements IQueryHandler<ReadAllInventoryQuery>
{
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(): Promise<InventoryWithQuantities[]> {
    const inventory = await this.inventoryRepository.findAll();

    return Promise.all(
      inventory.map(async (inventory) => {
        const quantities = await this.inventoryRepository.getQuantities(
          inventory.id,
        );
        return {
          ...inventory,
          quantities,
        };
      }),
    );
  }
}
