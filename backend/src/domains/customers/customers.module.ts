import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersRepository } from './repositories/customers.repository';
import { CreateCustomerHandler } from './commands/handlers/create-customer.handler';
import { UpdateCustomerHandler } from './commands/handlers/update-customer.handler';
import { DeleteCustomerHandler } from './commands/handlers/delete-customer.handler';
import {
  GetCustomerByIdHandler,
  GetAllCustomersHandler,
} from './queries/handlers/get-customer.handler';

const CommandHandlers = [
  CreateCustomerHandler,
  UpdateCustomerHandler,
  DeleteCustomerHandler,
];

const QueryHandlers = [GetCustomerByIdHandler, GetAllCustomersHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersRepository, ...CommandHandlers, ...QueryHandlers],
  exports: [],
})
export class CustomersModule {}
