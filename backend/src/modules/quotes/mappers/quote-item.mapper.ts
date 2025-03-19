import { Quote } from 'src/domain/quote/quote';
import { QuoteItem } from 'src/domain/quote/quote-item';
import { QuoteItemEntity } from '../entities/quote-item.entity';
import { QuoteEntity } from '../entities/quote.entity';

export class QuoteItemMapper {
  toDomain(entity: QuoteItemEntity): QuoteItem {
    return {
      id: entity.id,
      quoteId: entity.quote.id,
      materialType: entity.materialType,
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

  toEntity(quoteItem: QuoteItem, quote: QuoteEntity): QuoteItemEntity {
    return {
      id: quoteItem.id,
      quote,
      materialType: quoteItem.materialType,
      grade: quoteItem.grade,
      width: quoteItem.dimensions.width,
      length: quoteItem.dimensions.length,
      thickness: quoteItem.dimensions.thickness,
      unitOfMeasure: quoteItem.unitOfMeasure,
      quantity: quoteItem.quantity,
      price: quoteItem.price,
      total: quoteItem.total,
    };
  }
}
