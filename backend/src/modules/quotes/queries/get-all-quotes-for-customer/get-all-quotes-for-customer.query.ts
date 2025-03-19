import { IQuery } from '@nestjs/cqrs';

// TODO add pagination
export class GetAllQuotesForCustomerQuery implements IQuery {
  constructor(public readonly customerId: string) {}
}
