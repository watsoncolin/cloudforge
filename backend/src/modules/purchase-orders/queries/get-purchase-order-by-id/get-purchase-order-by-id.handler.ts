import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetPurchaseOrderByIdQuery } from './get-purchase-order-by-id.query';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
import { PurchaseOrdersRepository } from '../../repositories/purchase-order.repository';

@QueryHandler(GetPurchaseOrderByIdQuery)
export class GetPurchaseOrderByIdHandler
  implements IQueryHandler<GetPurchaseOrderByIdQuery>
{
  constructor(
    private readonly purchaseOrderRepository: PurchaseOrdersRepository,
  ) {}

  async execute(query: GetPurchaseOrderByIdQuery): Promise<PurchaseOrder> {
    const purchaseOrder = await this.purchaseOrderRepository.findById(query.id);

    if (!purchaseOrder) {
      throw new NotFoundException(
        `Purchase order with ID "${query.id}" not found`,
      );
    }

    return purchaseOrder;
  }
}
