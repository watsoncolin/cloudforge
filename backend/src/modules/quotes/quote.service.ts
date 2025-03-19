import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Quote } from 'src/domain/quote/quote';
import { GetQuoteByIdQuery } from './queries/get-quote-by-id/get-quote-by-id.query';
import { GetAllQuotesQuery } from './queries/get-all-quotes/get-all-quotes.query';
import { GetAllQuotesForCustomerQuery } from './queries/get-all-quotes-for-customer/get-all-quotes-for-customer.query';
import { ConvertToOrderCommand } from 'src/modules/orders/commands/convert-to-order/convert-to-order.command';
import { Order } from 'src/domain/order/order';
import { QuoteStatus } from 'src/enums';
import { UpdateQuoteStatusCommand } from './commands/update-quote-status/update-quote-status.command';

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

  convertToOrder(quote: Quote): Promise<Order> {
    return this.commandBus.execute(new ConvertToOrderCommand(quote));
  }

  updateStatus(quoteId: string, status: QuoteStatus): Promise<Quote> {
    return this.commandBus.execute(
      new UpdateQuoteStatusCommand(quoteId, status),
    );
  }
}
