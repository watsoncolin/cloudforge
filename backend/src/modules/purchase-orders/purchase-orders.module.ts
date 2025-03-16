import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeletePurchaseOrderHandler } from './commands/delete-purchase-order/delete-purchase-order.handler';
import { CreatePurchaseOrderHandler } from './commands/create-purchase-order/create-purchase-order.handler';
import { UpdatePurchaseOrderHandler } from './commands/update-purchase-order/update-purchase-order.handler';
import { PurchaseOrderEntity } from './entities/purchase-order.entity';
import { PurchaseOrderItemEntity } from './entities/purchase-order-items.entity';
import { GetAllPurchaseOrdersHandler } from './queries/get-all-purchase-orders/get-all-purchase-orders.handler';
import { PurchaseOrdersRepository } from './repositories/purchase-order.repository';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrderMapper } from './mappers/purchase-order.mapper';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrderItemMapper } from './mappers/purchase-order-item.mapper';
import { GetPurchaseOrderByIdHandler } from './queries/get-purchase-order-by-id/get-purchase-order-by-id.handler';
const CommandHandlers = [
  CreatePurchaseOrderHandler,
  UpdatePurchaseOrderHandler,
  DeletePurchaseOrderHandler,
];
const QueryHandlers = [
  GetAllPurchaseOrdersHandler,
  GetPurchaseOrderByIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PurchaseOrderEntity, PurchaseOrderItemEntity]),
  ],
  controllers: [PurchaseOrdersController],
  providers: [
    PurchaseOrdersRepository,
    PurchaseOrderMapper,
    PurchaseOrderItemMapper,
    PurchaseOrdersService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}
