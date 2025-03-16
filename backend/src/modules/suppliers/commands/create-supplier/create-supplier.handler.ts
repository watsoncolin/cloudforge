import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SuppliersRepository } from '../../repositories/suppliers.repository';
import { CreateSupplierCommand } from './create-supplier.command';
import { Supplier } from 'src/domain/supplier/supplier';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler
  implements ICommandHandler<CreateSupplierCommand>
{
  constructor(private readonly supplierRepository: SuppliersRepository) {}

  async execute(command: CreateSupplierCommand): Promise<Supplier> {
    const supplier: Supplier = {
      id: uuidv4(),
      name: command.createSupplierDto.name,
      contact: {
        name: command.createSupplierDto.contactName,
        email: command.createSupplierDto.contactEmail,
        phone: command.createSupplierDto.contactPhone,
      },
      address: {
        street: command.createSupplierDto.address,
        city: command.createSupplierDto.city,
        stateProvince: command.createSupplierDto.stateProvince,
        postalCode: command.createSupplierDto.postalCode,
        country: command.createSupplierDto.country,
      },
      paymentTerm: command.createSupplierDto.paymentTerm,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      materials: command.createSupplierDto.materials,
    };
    return this.supplierRepository.create(supplier);
  }
}
