import { ICommand } from '@nestjs/cqrs';
import { UpdatePurchaseOrderDto } from '../../dto/update-purchase-order.dto';

export class UpdatePurchaseOrderCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly updatePurchaseOrderDto: Partial<UpdatePurchaseOrderDto>,
  ) {}
}
