import { QuoteStatus } from 'src/enums';
import { QuoteItem } from './quote-item';

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
}
