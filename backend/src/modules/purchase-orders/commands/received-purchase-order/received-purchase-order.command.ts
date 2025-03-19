import { ICommand } from '@nestjs/cqrs';
import { ReceivePurchaseOrderDto } from '../../dto/receive-purchase-order.dto';
export class ReceivedPurchaseOrderCommand implements ICommand {
  constructor(
    public readonly purchaseOrderItemId: string,
    public readonly receivePurchaseOrderDto: ReceivePurchaseOrderDto,
  ) {}
}
