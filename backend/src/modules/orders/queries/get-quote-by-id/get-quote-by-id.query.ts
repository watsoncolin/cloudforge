import { IQuery } from '@nestjs/cqrs';

export class GetQuoteByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
