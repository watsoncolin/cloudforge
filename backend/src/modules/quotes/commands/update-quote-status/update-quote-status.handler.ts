import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SequenceService } from '../../../core/sequence/services/sequence.service';
import { RFQRepository } from '../../repositories/rfq.repository';
import { QuoteRepository } from '../../repositories/quote.repository';
import { Quote } from 'src/domain/quote/quote';
import { UpdateQuoteStatusCommand } from './update-quote-status.command';

@CommandHandler(UpdateQuoteStatusCommand)
export class UpdateQuoteStatusHandler
  implements ICommandHandler<UpdateQuoteStatusCommand>
{
  constructor(
    private readonly rfqRepository: RFQRepository,
    private readonly quoteRepository: QuoteRepository,
    private readonly sequenceService: SequenceService,
  ) {}

  async execute(command: UpdateQuoteStatusCommand): Promise<Quote> {
    const quote = await this.quoteRepository.findById(command.id);
    if (!quote) {
      throw new Error('Quote not found');
    }

    const updatedQuote = quote.updateStatus(command.status);

    return await this.quoteRepository.update(quote.id, updatedQuote);
  }
}
