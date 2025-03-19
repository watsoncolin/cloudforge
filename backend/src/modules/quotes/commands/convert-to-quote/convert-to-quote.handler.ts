import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SequenceService } from '../../../core/sequence/services/sequence.service';
import { ConvertToQuoteCommand } from './convert-to-quote.command';
import { RFQRepository } from '../../repositories/rfq.repository';
import { QuoteRepository } from '../../repositories/quote.repository';
import { Quote } from 'src/domain/quote/quote';

@CommandHandler(ConvertToQuoteCommand)
export class ConvertToQuoteHandler
  implements ICommandHandler<ConvertToQuoteCommand>
{
  constructor(
    private readonly rfqRepository: RFQRepository,
    private readonly quoteRepository: QuoteRepository,
    private readonly sequenceService: SequenceService,
  ) {}

  async execute(command: ConvertToQuoteCommand): Promise<Quote> {
    const rfq = await this.rfqRepository.findById(command.id);
    if (!rfq) {
      throw new Error('RFQ not found');
    }

    const quoteId = await this.sequenceService.getNextSequenceNumber('QUOTE');

    const { updatedRfq, quote } = rfq.convertToQuote(quoteId);

    await this.rfqRepository.update(updatedRfq.id, updatedRfq);
    await this.quoteRepository.create(quote);

    return quote;
  }
}
