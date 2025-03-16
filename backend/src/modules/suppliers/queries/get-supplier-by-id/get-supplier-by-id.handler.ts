import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetSupplierByIdQuery } from './get-supplier-by-id.query';
import { Supplier } from 'src/domain/supplier/supplier';
import { SuppliersRepository } from '../../repositories/suppliers.repository';
@QueryHandler(GetSupplierByIdQuery)
export class GetSupplierByIdHandler
  implements IQueryHandler<GetSupplierByIdQuery>
{
  constructor(private readonly supplierRepository: SuppliersRepository) {}

  async execute(query: GetSupplierByIdQuery): Promise<Supplier> {
    const supplier = await this.supplierRepository.findById(query.id);

    if (!supplier || !supplier.isActive) {
      throw new NotFoundException(`Supplier with ID "${query.id}" not found`);
    }

    return supplier;
  }
}
