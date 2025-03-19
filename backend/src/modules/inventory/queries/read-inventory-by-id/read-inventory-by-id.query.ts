import { IQuery } from '@nestjs/cqrs';

// TODO add pagination
export class ReadInventoryByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
