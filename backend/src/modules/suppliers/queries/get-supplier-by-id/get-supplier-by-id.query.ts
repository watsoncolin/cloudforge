import { IQuery } from '@nestjs/cqrs';

export class GetSupplierByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
