import { IQuery } from '@nestjs/cqrs';

// TODO add pagination
export class ReadBatchesByInventoryIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
