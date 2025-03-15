import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import {
  GetCustomerByIdQuery,
  GetAllCustomersQuery,
} from '../get-customer.query';
import { CustomersRepository } from '../../repositories/customers.repository';
import { Customer } from '../../entities/customer.entity';

@QueryHandler(GetCustomerByIdQuery)
export class GetCustomerByIdHandler
  implements IQueryHandler<GetCustomerByIdQuery>
{
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(query: GetCustomerByIdQuery): Promise<Customer> {
    const customer = await this.customersRepository.findById(query.id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID "${query.id}" not found`);
    }
    return customer;
  }
}

@QueryHandler(GetAllCustomersQuery)
export class GetAllCustomersHandler
  implements IQueryHandler<GetAllCustomersQuery>
{
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(): Promise<Customer[]> {
    return this.customersRepository.findAll();
  }
}
