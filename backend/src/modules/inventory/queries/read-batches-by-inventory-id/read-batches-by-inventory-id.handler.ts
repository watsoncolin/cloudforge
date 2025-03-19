import { QueryHandler } from '@nestjs/cqrs';

import { IQueryHandler } from '@nestjs/cqrs';
import { ReadBatchesByInventoryIdQuery } from './read-batches-by-inventory-id.query';
import { InventoryRepository } from '../../repositories/inventory.repository';
import { InventoryBatch } from 'src/domain/inventory/inventory-batch';

@QueryHandler(ReadBatchesByInventoryIdQuery)
export class ReadBatchesByInventoryIdHandler
  implements IQueryHandler<ReadBatchesByInventoryIdQuery>
{
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(
    query: ReadBatchesByInventoryIdQuery,
  ): Promise<InventoryBatch[]> {
    const batches = await this.inventoryRepository.findBatchesByInventoryId(
      query.id,
    );

    return batches;
  }
}
