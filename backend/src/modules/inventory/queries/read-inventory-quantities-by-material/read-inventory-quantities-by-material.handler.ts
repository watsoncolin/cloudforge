import { QueryHandler } from '@nestjs/cqrs';

import { IQueryHandler } from '@nestjs/cqrs';
import { ReadInventoryByMaterialQuery } from './read-inventory-quantities-by-material.query';
import { InventoryRepository } from '../../repositories/inventory.repository';
import { InventoryWithQuantities } from 'src/domain/inventory/inventory-with-quantities';
import { UnitOfMeasure } from 'src/enums';
@QueryHandler(ReadInventoryByMaterialQuery)
export class ReadInventoryByMaterialHandler
  implements IQueryHandler<ReadInventoryByMaterialQuery>
{
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(
    query: ReadInventoryByMaterialQuery,
  ): Promise<InventoryWithQuantities> {
    const inventory = await this.inventoryRepository.findByMaterial(
      query.materialType,
      query.grade,
      query.dimensions,
    );

    if (!inventory) {
      return {
        id: '',
        materialType: query.materialType,
        grade: query.grade,
        dimensions: query.dimensions,
        unitOfMeasure: UnitOfMeasure.PIECES,
        createdAt: new Date(),
        quantities: {
          availableQuantity: 0,
          allocatedQuantity: 0,
          totalQuantity: 0,
        },
      };
    }
    const quantities = await this.inventoryRepository.getQuantities(
      inventory.id,
    );
    return {
      ...inventory,
      quantities,
    };
  }
}
