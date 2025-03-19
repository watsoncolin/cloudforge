import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../repositories/order.repository';
import { Order } from 'src/domain/order/order';
import { GetOrderByIdQuery } from './get-order-by-id.query';

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdHandler implements IQueryHandler<GetOrderByIdQuery> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetOrderByIdQuery): Promise<Order> {
    const order = await this.orderRepository.findById(query.id);
    console.log('order', order);
    if (!order) {
      throw new NotFoundException(`Order with ID "${query.id}" not found`);
    }
    return order;
  }
}
