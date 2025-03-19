import { QueryHandler } from '@nestjs/cqrs';

import { IQueryHandler } from '@nestjs/cqrs';
import { Quote } from 'src/domain/quote/quote';
import { GetAllQuotesForCustomerQuery } from './get-all-quotes-for-customer.query';
import { QuoteRepository } from '../../repositories/quote.repository';

@QueryHandler(GetAllQuotesForCustomerQuery)
export class GetAllQuotesForCustomerHandler
  implements IQueryHandler<GetAllQuotesForCustomerQuery>
{
  constructor(private readonly quoteRepository: QuoteRepository) {}

  async execute(query: GetAllQuotesForCustomerQuery): Promise<Quote[]> {
    return this.quoteRepository.findAllForCustomer(query.customerId);
  }
}
