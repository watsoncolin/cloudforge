import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException } from '@nestjs/common';
import { CreateCustomerCommand } from './create-customer.command';
import { CustomersRepository } from '../../repositories/customers.repository';
import { Customer } from 'src/domain/customer/customer';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const existingCustomer = await this.customersRepository.findByEmail(
      command.createCustomerDto.contactEmail,
    );
    if (existingCustomer) {
      throw new ConflictException('Customer with this email already exists');
    }
    const address = {
      street: command.createCustomerDto.address,
      city: command.createCustomerDto.city,
      country: command.createCustomerDto.country,
      stateProvince: command.createCustomerDto.stateProvince,
      postalCode: command.createCustomerDto.postalCode,
    };
    const contact = {
      name: command.createCustomerDto.contactName,
      email: command.createCustomerDto.contactEmail,
      phone: command.createCustomerDto.contactPhone,
    };
    const customer: Customer = {
      id: uuidv4(),
      name: command.createCustomerDto.name,
      address,
      contact,
      paymentTerm: command.createCustomerDto.paymentTerm,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.customersRepository.create(customer);
  }
}
