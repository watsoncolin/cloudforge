import { CreateCustomerDto } from '../../dtos/create-customer.dto';

export class CreateCustomerCommand {
  constructor(public readonly createCustomerDto: CreateCustomerDto) {}
}
