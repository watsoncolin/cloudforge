import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { Supplier } from 'src/domain/supplier/supplier';
import { CreateSupplierCommand } from './commands/create-supplier/create-supplier.command';
import { UpdateSupplierCommand } from './commands/update-supplier/update-supplier.command';
import { DeleteSupplierCommand } from './commands/delete-supplier/delete-supplier.command';
import { GetAllSuppliersQuery } from './queries/get-all-suppliers/get-all-suppliers.query';
import { GetSupplierByIdQuery } from './queries/get-supplier-by-id/get-supplier-by-id.query';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.commandBus.execute(
      new CreateSupplierCommand(createSupplierDto),
    );
  }

  findAll(): Promise<Supplier[]> {
    return this.queryBus.execute(new GetAllSuppliersQuery());
  }

  findOne(id: string): Promise<Supplier> {
    return this.queryBus.execute(new GetSupplierByIdQuery(id));
  }

  update(
    id: string,
    updateSupplierDto: Partial<UpdateSupplierDto>,
  ): Promise<Supplier> {
    return this.commandBus.execute(
      new UpdateSupplierCommand(id, updateSupplierDto),
    );
  }

  remove(id: string): Promise<void> {
    return this.commandBus.execute(new DeleteSupplierCommand(id));
  }
}
