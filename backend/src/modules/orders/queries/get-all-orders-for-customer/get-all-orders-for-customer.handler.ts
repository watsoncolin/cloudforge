import { QueryHandler } from '@nestjs/cqrs';

import { IQueryHandler } from '@nestjs/cqrs';
import { Order } from 'src/domain/order/order';
import { OrderRepository } from 'src/modules/orders/repositories/order.repository';
import { GetAllOrdersForCustomerQuery } from './get-all-orders-for-customer.query';

@QueryHandler(GetAllOrdersForCustomerQuery)
export class GetAllOrdersForCustomerHandler
  implements IQueryHandler<GetAllOrdersForCustomerQuery>
{
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetAllOrdersForCustomerQuery): Promise<Order[]> {
    return this.orderRepository.findAllForCustomer(query.customerId);
  }
}
