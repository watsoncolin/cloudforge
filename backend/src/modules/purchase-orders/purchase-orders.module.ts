import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeletePurchaseOrderHandler } from './commands/delete-purchase-order/delete-purchase-order.handler';
import { CreatePurchaseOrderHandler } from './commands/create-purchase-order/create-purchase-order.handler';
import { UpdatePurchaseOrderHandler } from './commands/update-purchase-order/update-purchase-order.handler';
import { PurchaseOrderEntity } from './entities/purchase-order.entity';
import { GetAllPurchaseOrdersHandler } from './queries/get-all-purchase-orders/get-all-purchase-orders.handler';
import { PurchaseOrdersRepository } from './repositories/purchase-order.repository';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrderMapper } from './mappers/purchase-order.mapper';
import { PurchaseOrdersService } from './purchase-orders.service';

const CommandHandlers = [
  CreatePurchaseOrderHandler,
  UpdatePurchaseOrderHandler,
  DeletePurchaseOrderHandler,
];
const QueryHandlers = [GetAllPurchaseOrdersHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PurchaseOrderEntity])],
  controllers: [PurchaseOrdersController],
  providers: [
    PurchaseOrdersRepository,
    PurchaseOrderMapper,
    PurchaseOrdersService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}
