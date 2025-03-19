import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Quote } from 'src/domain/quote/quote';
import { GetQuoteByIdQuery } from './queries/get-quote-by-id/get-quote-by-id.query';
import { GetAllQuotesQuery } from './queries/get-all-quotes/get-all-quotes.query';
import { GetAllQuotesForCustomerQuery } from './queries/get-all-quotes-for-customer/get-all-quotes-for-customer.query';
@Injectable()
export class QuoteService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  findAll(): Promise<Quote[]> {
    return this.queryBus.execute(new GetAllQuotesQuery());
  }

  findOne(id: string): Promise<Quote> {
    return this.queryBus.execute(new GetQuoteByIdQuery(id));
  }

  findAllForCustomer(customerId: string): Promise<Quote[]> {
    return this.queryBus.execute(new GetAllQuotesForCustomerQuery(customerId));
  }
}
