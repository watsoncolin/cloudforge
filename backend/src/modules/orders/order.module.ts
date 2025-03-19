import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { InventoryModule } from '../inventory/inventory.module';
import { CustomersModule } from '../customers/customers.module';
import { OrderRepository } from './repositories/order.repository';
import { OrderController } from './controllers/orders.controller';
import { OrderService } from './order.service';
import { OrderMapper } from './mappers/order.mapper';
import { OrderEntity } from './entities/order.entity';
import { ConvertToOrderHandler } from './commands/convert-to-order/convert-to-order.handler';
import { QuotesModule } from '../quotes/quotes.module';
import { GetAllOrdersHandler } from './queries/get-all-orders/get-all-orders.handler';
import { GetAllOrdersForCustomerHandler } from './queries/get-all-orders-for-customer/get-all-orders-for-customer.handler';
import { GetOrderByIdHandler } from './queries/get-order-by-id/get-order-by-id.handler';

const CommandHandlers = [ConvertToOrderHandler];

const QueryHandlers = [
  GetAllOrdersHandler,
  GetAllOrdersForCustomerHandler,
  GetOrderByIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([OrderEntity]),
    CoreModule,
    CustomersModule,
    InventoryModule,
    QuotesModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderMapper,
    OrderService,
    OrderRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [OrderService],
})
export class OrdersModule {}
