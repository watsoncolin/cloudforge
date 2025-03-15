import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException } from '@nestjs/common';
import { CreateCustomerCommand } from '../create-customer.command';
import { CustomersRepository } from '../../repositories/customers.repository';
import { Customer } from '../../entities/customer.entity';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const existingCustomer = await this.customersRepository.findByEmail(
      command.contactEmail,
    );
    if (existingCustomer) {
      throw new ConflictException('Customer with this email already exists');
    }

    return this.customersRepository.create({
      name: command.name,
      contactName: command.contactName,
      contactEmail: command.contactEmail,
      contactPhone: command.contactPhone,
      address: command.address,
      city: command.city,
      country: command.country,
      stateProvince: command.stateProvince,
      zipCode: command.zipCode,
      paymentTerms: command.paymentTerms,
    });
  }
}
