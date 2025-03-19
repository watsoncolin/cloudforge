import { IQuery } from '@nestjs/cqrs';

// TODO add pagination
export class GetAllRFQsForCustomerQuery implements IQuery {
  constructor(public readonly customerId: string) {}
}
