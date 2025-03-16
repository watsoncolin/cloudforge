import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPurchaseOrdersQuery } from './get-all-purchase-orders.query';
import { PurchaseOrdersRepository } from '../../repositories/purchase-order.repository';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';

@QueryHandler(GetAllPurchaseOrdersQuery)
export class GetAllPurchaseOrdersHandler
  implements IQueryHandler<GetAllPurchaseOrdersQuery>
{
  constructor(
    private readonly purchaseOrderRepository: PurchaseOrdersRepository,
  ) {}

  async execute(): Promise<PurchaseOrder[]> {
    return this.purchaseOrderRepository.findAll();
  }
}
