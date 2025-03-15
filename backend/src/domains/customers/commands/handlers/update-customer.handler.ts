import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { UpdateCustomerCommand } from '../update-customer.command';
import { CustomersRepository } from '../../repositories/customers.repository';
import { Customer } from '../../entities/customer.entity';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(command: UpdateCustomerCommand): Promise<Customer> {
    const customer = await this.customersRepository.findById(command.id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID "${command.id}" not found`);
    }

    // If email is being updated, check for duplicates
    if (
      command.data.contactEmail &&
      command.data.contactEmail !== customer.contactEmail
    ) {
      const existingCustomer = await this.customersRepository.findByEmail(
        command.data.contactEmail,
      );
      if (existingCustomer && existingCustomer.id !== command.id) {
        throw new ConflictException('Customer with this email already exists');
      }
    }

    return this.customersRepository.update(command.id, command.data);
  }
}
