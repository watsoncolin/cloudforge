import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { UpdateCustomerCommand } from './update-customer.command';
import { CustomersRepository } from '../../repositories/customers.repository';
import { Customer } from 'src/domain/customer/customer';
import { Address } from 'src/domain/value-objects/address';
import { Contact } from 'src/domain/value-objects/contact';
import { PaymentTerms } from 'src/enums/payment-terms.enum';

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
      command.data.contactEmail !== customer.contact.email
    ) {
      const existingCustomer = await this.customersRepository.findByEmail(
        command.data.contactEmail,
      );
      if (existingCustomer && existingCustomer.id !== command.id) {
        throw new ConflictException('Customer with this email already exists');
      }
    }
    const updatedContact: Contact = {
      ...customer.contact,
      name: command.data.contactName,
      email: command.data.contactEmail,
      phone: command.data.contactPhone,
    };
    const updatedAddress: Address = {
      ...customer.address,
      street: command.data.address,
      city: command.data.city,
      country: command.data.country,
      stateProvince: command.data.stateProvince,
      postalCode: command.data.postalCode,
    };
    const updatedCustomer: Customer = {
      ...customer,
      name: customer.name,
      contact: updatedContact,
      address: updatedAddress,
      paymentTerms: command.data.paymentTerms,
      createdAt: customer.createdAt,
    };

    return this.customersRepository.update(command.id, updatedCustomer);
  }
}
