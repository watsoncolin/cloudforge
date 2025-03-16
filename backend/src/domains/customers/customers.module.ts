import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersRepository } from './repositories/customers.repository';
import { GetCustomerByIdHandler } from './queries/get-customer-by-id/get-customer-by-id.handler';
import { CreateCustomerHandler } from './commands/create-customer/create-customer.handler';
import { UpdateCustomerHandler } from './commands/update-customer/update-customer.handler';
import { DeleteCustomerHandler } from './commands/delete-customer/delete-customer.handler';
import { GetAllCustomersHandler } from './queries/get-all-customers/get-all-customers.handler';
import { CustomersService } from './customers.service';
const CommandHandlers = [
  CreateCustomerHandler,
  UpdateCustomerHandler,
  DeleteCustomerHandler,
];

const QueryHandlers = [GetCustomerByIdHandler, GetAllCustomersHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [
    CustomersRepository,
    CustomersService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
