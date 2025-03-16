import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrderMapper } from '../mappers/purchase-order.mapper';
import { PurchaseOrderEntity } from '../entities/purchase-order.entity';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
@Injectable()
export class PurchaseOrdersRepository {
  constructor(
    @InjectRepository(PurchaseOrderEntity)
    private readonly repository: Repository<PurchaseOrderEntity>,
    private readonly mapper: PurchaseOrderMapper,
  ) {}

  async create(data: PurchaseOrder): Promise<PurchaseOrder> {
    const purchaseOrder = this.repository.create(this.mapper.toEntity(data));
    const entity = await this.repository.save(purchaseOrder);
    return this.mapper.toDomain(entity);
  }

  async findAll(): Promise<PurchaseOrder[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findById(id: string): Promise<PurchaseOrder | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async update(id: string, data: PurchaseOrder): Promise<PurchaseOrder> {
    await this.repository.update(id, this.mapper.toEntity(data));
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
