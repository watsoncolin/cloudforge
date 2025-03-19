import { QuoteStatus } from 'src/enums';
import { QuoteItem } from './quote-item';
import { Order } from '../order/order';

export class Quote {
  constructor(
    public readonly id: string,
    public readonly readableId: string,
    public readonly rfqId: string,
    public readonly customerId: string,
    public readonly items: QuoteItem[],
    public readonly status: QuoteStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  updateStatus(status: QuoteStatus): Quote {
    return new Quote(
      this.id,
      this.readableId,
      this.rfqId,
      this.customerId,
      this.items,
      status,
      this.createdAt,
      this.updatedAt,
    );
  }
}
