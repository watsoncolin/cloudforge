import { ICommand } from '@nestjs/cqrs';

export class ApprovePurchaseOrderCommand implements ICommand {
  constructor(public readonly id: string) {}
}
