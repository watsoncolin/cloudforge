import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllOrdersQuery } from './queries/get-all-orders/get-all-orders.query';
import { GetAllOrdersForCustomerQuery } from './queries/get-all-orders-for-customer/get-all-orders-for-customer.query';
import { GetOrderByIdQuery } from './queries/get-order-by-id/get-order-by-id.query';
import { Order } from 'src/domain/order/order';
@Injectable()
export class OrderService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  findAll(): Promise<Order[]> {
    return this.queryBus.execute(new GetAllOrdersQuery());
  }

  findOne(id: string): Promise<Order> {
    return this.queryBus.execute(new GetOrderByIdQuery(id));
  }

  findAllForCustomer(customerId: string): Promise<Order[]> {
    return this.queryBus.execute(new GetAllOrdersForCustomerQuery(customerId));
  }
}
