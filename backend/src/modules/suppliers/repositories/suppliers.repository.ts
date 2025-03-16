import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierMapper } from '../mappers/supplier.mapper';
import { SupplierEntity } from '../entities/supplier.entity';
import { Supplier } from 'src/domain/supplier/supplier';
@Injectable()
export class SuppliersRepository {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly repository: Repository<SupplierEntity>,
    private readonly mapper: SupplierMapper,
  ) {}

  async create(data: Supplier): Promise<Supplier> {
    const supplier = this.repository.create(this.mapper.toEntity(data));
    const entity = await this.repository.save(supplier);
    return this.mapper.toDomain(entity);
  }

  async findAll(): Promise<Supplier[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findById(id: string): Promise<Supplier | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<Supplier | null> {
    const entity = await this.repository.findOneBy({ name });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async update(id: string, data: Supplier): Promise<Supplier> {
    await this.repository.update(id, this.mapper.toEntity(data));
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
