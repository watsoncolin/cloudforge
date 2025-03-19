import { Injectable } from '@nestjs/common';
import { InventoryEntity } from '../entities/inventory.entity';
import { Inventory } from 'src/domain/inventory/inventory';

@Injectable()
export class InventoryMapper {
  toDomain(entity: InventoryEntity): Inventory {
    return {
      id: entity.id,
      materialType: entity.materialType,
      grade: entity.grade,
      dimensions: {
        length: entity.length,
        width: entity.width,
        thickness: entity.thickness,
      },
      unitOfMeasure: entity.unitOfMeasure,
      createdAt: entity.createdAt,
    };
  }
  toEntity(inventory: Inventory): InventoryEntity {
    return {
      id: inventory.id,
      materialType: inventory.materialType,
      grade: inventory.grade,
      length: inventory.dimensions.length,
      width: inventory.dimensions.width,
      thickness: inventory.dimensions.thickness,
      unitOfMeasure: inventory.unitOfMeasure,
      createdAt: new Date(),
      events: [],
      batches: [],
      orderItems: [],
    };
  }
}
