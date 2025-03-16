import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';

// Command Handlers
import { CreateSupplierHandler } from './commands/create-supplier/create-supplier.handler';
import { UpdateSupplierHandler } from './commands/update-supplier/update-supplier.handler';
import { DeleteSupplierHandler } from './commands/delete-supplier/delete-supplier.handler';

// Query Handlers
import { GetAllSuppliersHandler } from './queries/get-all-suppliers/get-all-suppliers.handler';
import { GetSupplierByIdHandler } from './queries/get-supplier-by-id/get-supplier-by-id.handler';
import { SuppliersRepository } from './repositories/suppliers.repository';
import { SupplierEntity } from './entities/supplier.entity';
import { SupplierMapper } from './mappers/supplier.mapper';

const CommandHandlers = [
  CreateSupplierHandler,
  UpdateSupplierHandler,
  DeleteSupplierHandler,
];
const QueryHandlers = [GetAllSuppliersHandler, GetSupplierByIdHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([SupplierEntity])],
  controllers: [SuppliersController],
  providers: [
    SuppliersRepository,
    SupplierMapper,
    SuppliersService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [SuppliersService],
})
export class SuppliersModule {}
