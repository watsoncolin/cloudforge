import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RFQEntity } from '../entities/rfq.entity';
import { RFQItemMapper } from '../mappers/rfq-item.mapper';
import { RFQ } from 'src/domain/quote/rfq';
import { RFQMapper } from '../mappers/rfq.mapper';
import { RFQItem } from 'src/domain/quote/rfq-item';
@Injectable()
export class RFQRepository {
  constructor(
    @InjectRepository(RFQEntity)
    private readonly repository: Repository<RFQEntity>,
    private readonly rfqMapper: RFQMapper,
    private readonly rfqItemMapper: RFQItemMapper,
  ) {}

  async create(data: RFQ): Promise<RFQ> {
    const rfq = this.repository.create({
      id: data.id,
      customer: {
        id: data.customerId,
      },
      readableId: data.readableId,
      notes: data.notes,
      items: data.items.map((item) => ({
        id: item.id,
        materialType: item.materialType,
        grade: item.grade,
        width: item.dimensions.width,
        length: item.dimensions.length,
        thickness: item.dimensions.thickness,
        unitOfMeasure: item.unitOfMeasure,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      })),
      status: data.status,
      source: data.source,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });

    const entity = await this.repository.save(rfq);

    return this.rfqMapper.toDomain(entity);
  }

  async findAll(): Promise<RFQ[]> {
    const entities = await this.repository.find({
      relations: ['items'],
    });
    return entities.map((entity) => this.rfqMapper.toDomain(entity));
  }

  async findById(id: string): Promise<RFQ | null> {
    return this.repository
      .findOne({
        where: { id },
        relations: ['items'],
      })
      .then((entity) => (entity ? this.rfqMapper.toDomain(entity) : null));
  }

  async findByCustomerId(customerId: string): Promise<RFQ[]> {
    return this.repository
      .find({
        where: { customer: { id: customerId } },
        relations: ['items'],
      })
      .then((entities) =>
        entities.map((entity) => this.rfqMapper.toDomain(entity)),
      );
  }

  async update(id: string, data: RFQ): Promise<RFQ> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('RFQ not found');
    }
    entity.notes = data.notes;
    entity.status = data.status;
    entity.updatedAt = data.updatedAt;
    entity.items = data.items.map((item) =>
      this.rfqItemMapper.toEntity(item, entity),
    );

    return this.rfqMapper.toDomain(await this.repository.save(entity));
  }

  async addItem(id: string, item: RFQItem): Promise<RFQ> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('RFQ not found');
    }
    entity.items.push(this.rfqItemMapper.toEntity(item, entity));
    return this.rfqMapper.toDomain(await this.repository.save(entity));
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAllForCustomer(customerId: string): Promise<RFQ[]> {
    return this.repository
      .find({ where: { customer: { id: customerId } } })
      .then((entities) =>
        entities.map((entity) => this.rfqMapper.toDomain(entity)),
      );
  }
}
