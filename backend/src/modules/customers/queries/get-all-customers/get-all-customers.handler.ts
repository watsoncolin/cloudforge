import { QueryHandler } from '@nestjs/cqrs';

import { IQueryHandler } from '@nestjs/cqrs';
import { Customer } from 'src/domain/customer/customer';
import { GetAllCustomersQuery } from './get-all-customers.query';
import { CustomersRepository } from '../../repositories/customers.repository';

@QueryHandler(GetAllCustomersQuery)
export class GetAllCustomersHandler
  implements IQueryHandler<GetAllCustomersQuery>
{
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(): Promise<Customer[]> {
    return this.customersRepository.findAll();
  }
}
