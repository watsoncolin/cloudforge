import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RFQEntity } from '../entities/rfq.entity';
import { RFQItemMapper } from '../mappers/rfq-item.mapper';
import { Quote } from 'src/domain/quote/quote';
import { QuoteMapper } from '../mappers/quote.mapper';
import { QuoteItemMapper } from '../mappers/quote-item.mapper';
import { QuoteEntity } from '../entities/quote.entity';
import { QuoteItem } from 'src/domain/quote/quote-item';

@Injectable()
export class QuoteRepository {
  constructor(
    @InjectRepository(QuoteEntity)
    private readonly repository: Repository<QuoteEntity>,
    private readonly quoteMapper: QuoteMapper,
    private readonly quoteItemMapper: QuoteItemMapper,
  ) {}

  async create(data: Quote): Promise<Quote> {
    const quote = this.repository.create({
      id: data.id,
      customer: {
        id: data.customerId,
      },
      readableId: data.readableId,
      rfqId: data.rfqId,
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
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });

    const entity = await this.repository.save(quote);

    return this.quoteMapper.toDomain(entity);
  }

  async findAll(): Promise<Quote[]> {
    const entities = await this.repository.find({
      relations: ['items'],
    });
    return entities.map((entity) => this.quoteMapper.toDomain(entity));
  }

  async findById(id: string): Promise<Quote | null> {
    return this.repository
      .findOne({
        where: { id },
        relations: ['items'],
      })
      .then((entity) => (entity ? this.quoteMapper.toDomain(entity) : null));
  }

  async findByCustomerId(customerId: string): Promise<Quote[]> {
    return this.repository
      .find({
        where: { customer: { id: customerId } },
        relations: ['items'],
      })
      .then((entities) =>
        entities.map((entity) => this.quoteMapper.toDomain(entity)),
      );
  }

  async update(id: string, data: Quote): Promise<Quote> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('Quote not found');
    }
    entity.status = data.status;
    entity.updatedAt = data.updatedAt;
    entity.items = data.items.map((item) =>
      this.quoteItemMapper.toEntity(item, entity),
    );

    return this.quoteMapper.toDomain(await this.repository.save(entity));
  }

  async addItem(id: string, item: QuoteItem): Promise<Quote> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('Quote not found');
    }
    entity.items.push(this.quoteItemMapper.toEntity(item, entity));
    return this.quoteMapper.toDomain(await this.repository.save(entity));
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAllForCustomer(customerId: string): Promise<Quote[]> {
    return this.repository
      .find({ where: { customer: { id: customerId } } })
      .then((entities) =>
        entities.map((entity) => this.quoteMapper.toDomain(entity)),
      );
  }
}
