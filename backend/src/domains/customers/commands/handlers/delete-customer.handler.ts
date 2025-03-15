import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteCustomerCommand } from '../delete-customer.command';
import { CustomersRepository } from '../../repositories/customers.repository';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand>
{
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(command: DeleteCustomerCommand): Promise<void> {
    const customer = await this.customersRepository.findById(command.id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID "${command.id}" not found`);
    }

    await this.customersRepository.delete(command.id);
  }
}
