import { QueryHandler } from '@nestjs/cqrs';

import { IQueryHandler } from '@nestjs/cqrs';
import { ReadInventoryByIdQuery } from './read-inventory-by-id.query';
import { InventoryRepository } from '../../repositories/inventory.repository';
import { InventoryWithQuantities } from 'src/domain/inventory/inventory-with-quantities';

@QueryHandler(ReadInventoryByIdQuery)
export class ReadInventoryByIdHandler
  implements IQueryHandler<ReadInventoryByIdQuery>
{
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(
    query: ReadInventoryByIdQuery,
  ): Promise<InventoryWithQuantities> {
    const inventory = await this.inventoryRepository.findById(query.id);

    const quantities = await this.inventoryRepository.getQuantities(
      inventory.id,
    );
    return {
      ...inventory,
      quantities,
    };
  }
}
