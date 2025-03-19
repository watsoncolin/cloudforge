import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrderMapper } from '../mappers/purchase-order.mapper';
import { PurchaseOrderEntity } from '../entities/purchase-order.entity';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
import { PurchaseOrderItem } from 'src/domain/purchase-order/purchase-order-item';
import { PurchaseOrderItemMapper } from '../mappers/purchase-order-item.mapper';
import { PurchaseOrderItemEntity } from '../entities/purchase-order-items.entity';
@Injectable()
export class PurchaseOrdersRepository {
  constructor(
    @InjectRepository(PurchaseOrderEntity)
    private readonly repository: Repository<PurchaseOrderEntity>,
    @InjectRepository(PurchaseOrderItemEntity)
    private readonly purchaseOrderItemRepository: Repository<PurchaseOrderItemEntity>,
    private readonly mapper: PurchaseOrderMapper,
    private readonly purchaseOrderItemMapper: PurchaseOrderItemMapper,
  ) {}

  async create(data: PurchaseOrder): Promise<PurchaseOrder> {
    const entity = this.mapper.toEntity(data);
    const savedEntity = await this.repository.save(entity);
    const purchaseOrderWithItems = await this.repository.findOne({
      where: { id: savedEntity.id },
      relations: ['items'],
    });
    return this.mapper.toDomain(purchaseOrderWithItems);
  }

  async findAll(): Promise<PurchaseOrder[]> {
    const entities = await this.repository.find({
      relations: ['items'],
    });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findById(id: string): Promise<PurchaseOrder | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['items'],
    });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async findByPurchaseOrderItemId(
    purchaseOrderItemId: string,
  ): Promise<PurchaseOrder | null> {
    const entity = await this.repository.findOne({
      where: { items: { id: purchaseOrderItemId } },
      relations: ['items'],
    });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async findByReadableId(readableId: string): Promise<PurchaseOrder | null> {
    const entity = await this.repository.findOne({
      where: { readableId },
      relations: ['items'],
    });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async update(id: string, data: PurchaseOrder): Promise<PurchaseOrder> {
    const entity = this.mapper.toEntity(data);
    await this.repository.save(entity);
    const updatedEntity = await this.repository.findOne({
      where: { id },
      relations: ['items'],
    });
    return this.mapper.toDomain(updatedEntity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async updatePurchaseOrderItem(
    id: string,
    data: PurchaseOrderItem,
  ): Promise<PurchaseOrderItem> {
    const purchaseOrder = await this.findById(data.purchaseOrderId);
    if (!purchaseOrder) {
      throw new NotFoundException('Purchase order not found');
    }

    const purchaseOrderEntity = this.mapper.toEntity(purchaseOrder);

    const entity = this.purchaseOrderItemMapper.toEntity(
      data,
      purchaseOrderEntity,
    );

    await this.purchaseOrderItemRepository.save(entity);
    return this.purchaseOrderItemMapper.toDomain(entity);
  }
}
