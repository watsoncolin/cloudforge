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
import { ApprovePurchaseOrderHandler } from './commands/approve-purchase-order/approve-purchase-order.handler';
import { MarkShippedPurchaseOrderHandler } from './commands/mark-shipped-purchase-order/mark-shipped-purchase-order.handler';
import { ReceivedPurchaseOrderHandler } from './commands/received-purchase-order/received-purchase-order.handler';
import { CoreModule } from '../core/core.module';

const CommandHandlers = [
  CreatePurchaseOrderHandler,
  UpdatePurchaseOrderHandler,
  DeletePurchaseOrderHandler,
  ApprovePurchaseOrderHandler,
  MarkShippedPurchaseOrderHandler,
  ReceivedPurchaseOrderHandler,
];
const QueryHandlers = [
  GetAllPurchaseOrdersHandler,
  GetPurchaseOrderByIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    CoreModule,
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
