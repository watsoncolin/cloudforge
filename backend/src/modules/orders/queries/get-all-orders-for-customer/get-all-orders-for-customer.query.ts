import { IQuery } from '@nestjs/cqrs';

// TODO add pagination
export class GetAllOrdersForCustomerQuery implements IQuery {
  constructor(public readonly customerId: string) {}
}
