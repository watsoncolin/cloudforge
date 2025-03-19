import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderMapper } from '../mappers/order.mapper';
import { OrderEntity } from '../entities/order.entity';
import { Order } from 'src/domain/order/order';
import { InventoryService } from 'src/modules/inventory/inventory.service';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
    private readonly orderMapper: OrderMapper,
    private readonly inventoryService: InventoryService,
  ) {}

  async create(data: Order): Promise<Order> {
    const order = this.repository.create({
      id: data.id,
      customer: {
        id: data.customerId,
      },
      readableId: data.readableId,
      quote: {
        id: data.quoteId,
      },
      items: await Promise.all(
        data.items.map(async (item) => {
          return {
            id: item.id,
            inventory: {
              id: item.inventoryId,
            },
            batches: item.batchIds.map((batchId) => ({
              id: batchId,
            })),
            unitOfMeasure: item.unitOfMeasure,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          };
        }),
      ),
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });

    const entity = await this.repository.save(order);

    return this.orderMapper.toDomain(entity);
  }

  async findAll(): Promise<Order[]> {
    const entities = await this.repository.find({
      relations: ['items', 'items.batches'],
    });
    return entities.map((entity) => this.orderMapper.toDomain(entity));
  }

  async findById(id: string): Promise<Order | null> {
    return this.repository
      .findOne({
        where: { id },
        relations: ['items', 'items.batches'],
      })
      .then((entity) => (entity ? this.orderMapper.toDomain(entity) : null));
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    return this.repository
      .find({
        where: { customer: { id: customerId } },
        relations: ['items'],
      })
      .then((entities) =>
        entities.map((entity) => this.orderMapper.toDomain(entity)),
      );
  }

  async update(id: string, data: Order): Promise<Order> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('Order not found');
    }
    entity.status = data.status;
    entity.updatedAt = data.updatedAt;

    return this.orderMapper.toDomain(await this.repository.save(entity));
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAllForCustomer(customerId: string): Promise<Order[]> {
    return this.repository
      .find({ where: { customer: { id: customerId } } })
      .then((entities) =>
        entities.map((entity) => this.orderMapper.toDomain(entity)),
      );
  }
}
