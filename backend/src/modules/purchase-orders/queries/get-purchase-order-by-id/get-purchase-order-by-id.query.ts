import { IQuery } from '@nestjs/cqrs';

export class GetPurchaseOrderByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
