import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetQuoteByIdQuery } from './get-quote-by-id.query';
import { QuoteRepository } from '../../repositories/quote.repository';
import { Quote } from 'src/domain/quote/quote';

@QueryHandler(GetQuoteByIdQuery)
export class GetQuoteByIdHandler implements IQueryHandler<GetQuoteByIdQuery> {
  constructor(private readonly quoteRepository: QuoteRepository) {}

  async execute(query: GetQuoteByIdQuery): Promise<Quote> {
    const quote = await this.quoteRepository.findById(query.id);
    if (!quote) {
      throw new NotFoundException(`Quote with ID "${query.id}" not found`);
    }
    return quote;
  }
}
