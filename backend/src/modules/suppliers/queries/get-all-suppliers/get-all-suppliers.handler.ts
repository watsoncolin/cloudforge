import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSuppliersQuery } from './get-all-suppliers.query';
import { SuppliersRepository } from '../../repositories/suppliers.repository';
import { Supplier } from 'src/domain/supplier/supplier';

@QueryHandler(GetAllSuppliersQuery)
export class GetAllSuppliersHandler
  implements IQueryHandler<GetAllSuppliersQuery>
{
  constructor(private readonly supplierRepository: SuppliersRepository) {}

  async execute(): Promise<Supplier[]> {
    return this.supplierRepository.findAll();
  }
}
