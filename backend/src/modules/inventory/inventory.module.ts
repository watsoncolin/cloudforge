import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './repositories/inventory.repository';
import { InventoryMapper } from './mappers/inventory.mapper';
import { InventoryBatchEntity } from './entities/inventory-batch.entity';
import { InventoryEntity } from './entities/inventory.entity';
import { AddItemsToInventoryHandler } from './commands/add-items-to-inventory/add-items-to-inventory.handler';
import { InventoryBatchMapper } from './mappers/inventory-batch.mapper';
import { PurchaseOrderEntity } from 'src/modules/purchase-orders/entities/purchase-order.entity';
import { SupplierEntity } from 'src/modules/suppliers/entities/supplier.entity';
import { PurchaseOrderItemEntity } from 'src/modules/purchase-orders/entities/purchase-order-items.entity';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { PurchaseOrdersModule } from '../purchase-orders/purchase-orders.module';
import { PurchaseOrderSaga } from './purchase-order.saga';
import { InventoryEventEntity } from './entities/inventory-event.entity';
import { ReadAllInventoryHandler } from './queries/read-all-inventory/read-all-inventory.handler';
import { InventorySaga } from './inventory.saga';
import { InventoryEventMapper } from './mappers/inventory-event.mapper';
import { AddInventoryEventFromBatchHandler } from './commands/add-inventory-event-from-batch/add-inventory-event-from-batch.handler';
import { ReadInventoryByIdHandler } from './queries/read-inventory-by-id/read-inventory-by-id.handler';
import { ReadBatchesByInventoryIdHandler } from './queries/read-batches-by-inventory-id/read-batches-by-inventory-id.handler';
import { InventoryBatchController } from './batch.controller';
import { UpdateBatchLocationHandler } from './commands/update-batch-location/update-batch-location.handler';
import { ReadInventoryByMaterialHandler } from './queries/read-inventory-quantities-by-material/read-inventory-quantities-by-material.handler';

const CommandHandlers = [
  AddItemsToInventoryHandler,
  AddInventoryEventFromBatchHandler,
  UpdateBatchLocationHandler,
];
const QueryHandlers = [
  ReadAllInventoryHandler,
  ReadInventoryByIdHandler,
  ReadBatchesByInventoryIdHandler,
  ReadInventoryByMaterialHandler,
];
const Sagas = [PurchaseOrderSaga, InventorySaga];

@Module({
  imports: [
    CqrsModule,
    PurchaseOrdersModule,
    SuppliersModule,
    TypeOrmModule.forFeature([
      InventoryEntity,
      InventoryBatchEntity,
      InventoryEventEntity,
      PurchaseOrderEntity,
      SupplierEntity,
      PurchaseOrderItemEntity,
    ]),
  ],
  controllers: [InventoryController, InventoryBatchController],
  providers: [
    InventoryService,
    InventoryRepository,
    InventoryMapper,
    InventoryBatchMapper,
    InventoryEventMapper,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Sagas,
  ],
  exports: [
    InventoryService,
    InventoryMapper,
    // TODO: remove this
    InventoryRepository,
  ],
})
export class InventoryModule {}
