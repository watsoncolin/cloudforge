import { Injectable } from '@nestjs/common';
import { QuoteEntity } from '../entities/quote.entity';
import { Quote } from 'src/domain/quote/quote';
@Injectable()
export class QuoteMapper {
  toDomain(entity: QuoteEntity): Quote {
    return new Quote(
      entity.id,
      entity.readableId,
      entity.rfqId,
      entity.customer.id,
      entity.items?.map((item) => ({
        id: item.id,
        quoteId: entity.id,
        materialType: item.materialType,
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
      })) ?? [],
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
