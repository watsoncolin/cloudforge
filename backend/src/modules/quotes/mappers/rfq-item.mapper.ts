import { RFQEntity } from '../entities/rfq.entity';
import { RFQItem } from 'src/domain/quote/rfq-item';
import { RFQItemEntity } from '../entities/rfq-item.entity';

export class RFQItemMapper {
  toDomain(entity: RFQItemEntity): RFQItem {
    return {
      id: entity.id,
      rfqId: entity.rfq.id,
      materialType: entity.materialType,
      processingType: entity.processingType,
      grade: entity.grade,
      dimensions: {
        width: entity.width,
        length: entity.length,
        thickness: entity.thickness,
      },
      unitOfMeasure: entity.unitOfMeasure,
      quantity: entity.quantity,
      price: entity.price,
      total: entity.total,
    };
  }

  toEntity(rfqItem: RFQItem, rfq: RFQEntity): RFQItemEntity {
    return {
      id: rfqItem.id,
      rfq,
      materialType: rfqItem.materialType,
      processingType: rfqItem.processingType,
      grade: rfqItem.grade,
      width: rfqItem.dimensions.width,
      length: rfqItem.dimensions.length,
      thickness: rfqItem.dimensions.thickness,
      unitOfMeasure: rfqItem.unitOfMeasure,
      quantity: rfqItem.quantity,
      price: rfqItem.price,
      total: rfqItem.total,
    };
  }
}
