import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Customer } from 'src/domain/customer/customer';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CreateCustomerCommand } from './commands/create-customer/create-customer.command';
import { GetAllCustomersQuery } from './queries/get-all-customers/get-all-customers.query';
import { GetCustomerByIdQuery } from './queries/get-customer-by-id/get-customer-by-id.query';
import { UpdateCustomerCommand } from './commands/update-customer/update-customer.command';
import { DeleteCustomerCommand } from './commands/delete-customer/delete-customer.command';

@Injectable()
export class CustomersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.commandBus.execute(
      new CreateCustomerCommand(createCustomerDto),
    );
  }

  findAll(): Promise<Customer[]> {
    return this.queryBus.execute(new GetAllCustomersQuery());
  }

  findOne(id: string): Promise<Customer> {
    return this.queryBus.execute(new GetCustomerByIdQuery(id));
  }

  update(
    id: string,
    updateCustomerDto: Partial<CreateCustomerDto>,
  ): Promise<Customer> {
    return this.commandBus.execute(
      new UpdateCustomerCommand(id, updateCustomerDto),
    );
  }

  remove(id: string): Promise<void> {
    return this.commandBus.execute(new DeleteCustomerCommand(id));
  }
}
