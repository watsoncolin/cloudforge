import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

@Injectable()
export class CustomersRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async create(data: CreateCustomerDto): Promise<Customer> {
    const customer = this.repository.create(data);
    return this.repository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Customer | null> {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.repository.findOneBy({ contactEmail: email });
  }

  async update(id: string, data: Partial<Customer>): Promise<Customer> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
