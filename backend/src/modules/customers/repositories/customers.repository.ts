import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/domain/customer/customer';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerMapper } from '../mappers/customer.mapper';
@Injectable()
export class CustomersRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
    private readonly customerMapper: CustomerMapper,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const customer = this.repository.create(this.customerMapper.toEntity(data));
    return this.customerMapper.toDomain(await this.repository.save(customer));
  }

  async findAll(): Promise<Customer[]> {
    return this.repository
      .find()
      .then((entities) =>
        entities.map((entity) => this.customerMapper.toDomain(entity)),
      );
  }

  async findById(id: string): Promise<Customer | null> {
    return this.repository
      .findOneBy({ id })
      .then((entity) => (entity ? this.customerMapper.toDomain(entity) : null));
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.repository
      .findOneBy({ contactEmail: email })
      .then((entity) => (entity ? this.customerMapper.toDomain(entity) : null));
  }

  async update(id: string, data: Customer): Promise<Customer> {
    await this.repository.update(id, this.customerMapper.toEntity(data));
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
