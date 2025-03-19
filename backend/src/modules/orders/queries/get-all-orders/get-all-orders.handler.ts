import { QueryHandler } from '@nestjs/cqrs';

import { IQueryHandler } from '@nestjs/cqrs';
import { Order } from 'src/domain/order/order';
import { GetAllOrdersQuery } from './get-all-orders.query';
import { OrderRepository } from 'src/modules/orders/repositories/order.repository';

@QueryHandler(GetAllOrdersQuery)
export class GetAllOrdersHandler implements IQueryHandler<GetAllOrdersQuery> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
