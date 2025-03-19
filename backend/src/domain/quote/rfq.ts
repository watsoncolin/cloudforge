import { RFQStatus, RFQSource, QuoteStatus } from 'src/enums';
import { RFQItem } from './rfq-item';
import { UpdateRFQDto } from 'src/modules/quotes/dtos/update-rfq.dto';
import { v4 as uuidv4 } from 'uuid';
import { Quote } from './quote';
import { QuoteItem } from './quote-item';
export class RFQ {
  constructor(
    public readonly id: string,
    public readonly readableId: string,
    public readonly customerId: string,
    public readonly items: RFQItem[],
    public readonly status: RFQStatus,
    public readonly source: RFQSource,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly notes?: string,
  ) {}

  update(updateRFQDto: UpdateRFQDto) {
    // TODO: Check for status and if it is not pending don't allow items to be updated, throw an error

    const updatedRFQ = new RFQ(
      this.id,
      this.readableId,
      this.customerId,
      updateRFQDto.items.map((item) => ({
        id:
          item.id == null ? uuidv4() : item.id.length > 0 ? item.id : uuidv4(),
        rfqId: this.id,
        materialType: item.materialType,
        grade: item.grade,
        dimensions: {
          length: item.dimensions.length,
          width: item.dimensions.width,
          thickness: item.dimensions.thickness,
        },
        unitOfMeasure: item.unitOfMeasure,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      })),
      updateRFQDto.status,
      this.source,
      this.createdAt,
      new Date(),
      updateRFQDto.notes,
    );

    return updatedRFQ;
  }

  convertToQuote(readableId: string) {
    const updatedRFQ = new RFQ(
      this.id,
      this.readableId,
      this.customerId,
      this.items,
      RFQStatus.QUOTE,
      this.source,
      this.createdAt,
      new Date(),
      this.notes,
    );
    const quoteId = uuidv4();

    const quote = new Quote(
      quoteId,
      readableId,
      this.id,
      this.customerId,
      this.items.map(
        (item) =>
          new QuoteItem(
            uuidv4(),
            quoteId,
            item.materialType,
            item.grade,
            item.dimensions,
            item.quantity,
            item.unitOfMeasure,
            item.price,
            item.total,
          ),
      ),
      QuoteStatus.PENDING,
      this.createdAt,
      new Date(),
    );

    return {
      updatedRfq: updatedRFQ,
      quote: quote,
    };
  }
}
