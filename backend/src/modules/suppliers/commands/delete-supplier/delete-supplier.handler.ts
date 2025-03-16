import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { SuppliersRepository } from '../../repositories/suppliers.repository';
import { DeleteSupplierCommand } from './delete-supplier.command';

@CommandHandler(DeleteSupplierCommand)
export class DeleteSupplierHandler
  implements ICommandHandler<DeleteSupplierCommand>
{
  constructor(private readonly supplierRepository: SuppliersRepository) {}

  async execute(command: DeleteSupplierCommand): Promise<void> {
    const supplier = await this.supplierRepository.findById(command.id);

    if (!supplier || !supplier.isActive) {
      throw new NotFoundException(`Supplier with ID "${command.id}" not found`);
    }

    supplier.isActive = false;
    await this.supplierRepository.update(supplier.id, supplier);
  }
}
