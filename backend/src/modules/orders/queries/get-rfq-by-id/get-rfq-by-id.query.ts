import { IQuery } from '@nestjs/cqrs';

export class GetRFQByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
