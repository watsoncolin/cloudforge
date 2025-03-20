import { RFQEntity } from '../entities/rfq.entity';
import { RFQ } from 'src/domain/quote/rfq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RFQMapper {
  toDomain(entity: RFQEntity): RFQ {
    return new RFQ(
      entity.id,
      entity.readableId,
      entity.customer.id,
      entity.items?.map((item) => ({
        id: item.id,
        materialType: item.materialType,
        processingType: item.processingType,
        grade: item.grade,
        dimensions: {
          width: item.width,
          length: item.length,
          thickness: item.thickness,
        },
        unitOfMeasure: item.unitOfMeasure,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        rfqId: entity.id,
      })) ?? [],
      entity.status,
      entity.source,
      entity.createdAt,
      entity.updatedAt,
      entity.notes,
    );
  }
}
