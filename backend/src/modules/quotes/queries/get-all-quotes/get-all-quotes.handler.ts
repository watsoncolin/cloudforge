import { QueryHandler } from '@nestjs/cqrs';

import { IQueryHandler } from '@nestjs/cqrs';
import { Quote } from 'src/domain/quote/quote';
import { GetAllQuotesQuery } from './get-all-quotes.query';
import { QuoteRepository } from '../../repositories/quote.repository';

@QueryHandler(GetAllQuotesQuery)
export class GetAllQuotesHandler implements IQueryHandler<GetAllQuotesQuery> {
  constructor(private readonly quoteRepository: QuoteRepository) {}

  async execute(): Promise<Quote[]> {
    return this.quoteRepository.findAll();
  }
}
