import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { SuppliersRepository } from '../../repositories/suppliers.repository';
import { UpdateSupplierCommand } from './update-supplier.command';
import { Supplier } from 'src/domain/supplier/supplier';

@CommandHandler(UpdateSupplierCommand)
export class UpdateSupplierHandler
  implements ICommandHandler<UpdateSupplierCommand>
{
  constructor(private readonly supplierRepository: SuppliersRepository) {}

  async execute(command: UpdateSupplierCommand): Promise<Supplier> {
    const supplier = await this.supplierRepository.findById(command.id);

    if (!supplier || !supplier.isActive) {
      throw new NotFoundException(`Supplier with ID "${command.id}" not found`);
    }

    Object.assign(supplier, command.updateSupplierDto);
    return this.supplierRepository.update(supplier.id, supplier);
  }
}
