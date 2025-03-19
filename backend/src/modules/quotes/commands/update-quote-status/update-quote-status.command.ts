import { QuoteStatus } from 'src/enums';

export class UpdateQuoteStatusCommand {
  constructor(
    public readonly id: string,
    public readonly status: QuoteStatus,
  ) {}
}
