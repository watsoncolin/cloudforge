import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryMapper } from '../mappers/inventory.mapper';
import { InventoryEntity } from '../entities/inventory.entity';
import { Inventory } from 'src/domain/inventory/inventory';
import { InventoryEventType, Material } from 'src/enums';
import { Dimensions } from 'src/domain/value-objects';
import { InventoryBatchEntity } from '../entities/inventory-batch.entity';
import { InventoryBatch } from 'src/domain/inventory/inventory-batch';
import { InventoryBatchMapper } from '../mappers/inventory-batch.mapper';
import { SupplierEntity } from 'src/modules/suppliers/entities/supplier.entity';
import { PurchaseOrderEntity } from 'src/modules/purchase-orders/entities/purchase-order.entity';
import { PurchaseOrderItemEntity } from 'src/modules/purchase-orders/entities/purchase-order-items.entity';
import { Quantities } from 'src/domain/inventory/quantities';
import { InventoryEventEntity } from '../entities/inventory-event.entity';
import { EventBus } from '@nestjs/cqrs';
import { InventoryBatchAddedEvent } from 'src/events/inventory-batch-added.event';
import { InventoryEvent } from 'src/domain/inventory/inventory-event';
import { InventoryEventMapper } from '../mappers/inventory-event.mapper';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly repository: Repository<InventoryEntity>,
    @InjectRepository(InventoryBatchEntity)
    private readonly batchRepository: Repository<InventoryBatchEntity>,
    @InjectRepository(PurchaseOrderEntity)
    private readonly purchaseOrderRepository: Repository<PurchaseOrderEntity>,
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
    @InjectRepository(PurchaseOrderItemEntity)
    private readonly purchaseOrderItemRepository: Repository<PurchaseOrderItemEntity>,
    @InjectRepository(InventoryEventEntity)
    private readonly inventoryEventRepository: Repository<InventoryEventEntity>,
    private readonly eventBus: EventBus,
    private readonly mapper: InventoryMapper,
    private readonly inventoryBatchMapper: InventoryBatchMapper,
    private readonly inventoryEventMapper: InventoryEventMapper,
  ) {}

  async create(data: Inventory): Promise<Inventory> {
    const entity = this.mapper.toEntity(data);
    const savedEntity = await this.repository.save(entity);
    const inventoryWithItems = await this.repository.findOne({
      where: { id: savedEntity.id },
      relations: ['batches'],
    });
    return this.mapper.toDomain(inventoryWithItems);
  }

  async createBatch(
    inventoryId: string,
    data: InventoryBatch,
  ): Promise<InventoryBatch> {
    const inventory = await this.repository.findOne({
      where: { id: inventoryId },
    });
    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }
    const purchaseOrder = await this.purchaseOrderRepository.findOne({
      where: { id: data.purchaseOrderId },
    });
    if (!purchaseOrder) {
      throw new NotFoundException('Purchase order not found');
    }
    const supplier = await this.supplierRepository.findOne({
      where: { id: data.supplierId },
    });
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    const purchaseOrderItem = await this.purchaseOrderItemRepository.findOne({
      where: { id: data.purchaseOrderItemId },
    });
    if (!purchaseOrderItem) {
      throw new NotFoundException('Purchase order item not found');
    }

    const entity: InventoryBatchEntity = {
      inventory,
      supplier,
      purchaseOrderId: purchaseOrder.id,
      purchaseOrderItemId: purchaseOrderItem.id,
      receivedAt: data.receivedAt,
      heatNumber: data.heatNumber,
      millCertUrl: data.millCertUrl,
      quantityReceived: data.quantity,
      status: data.status,
      warehouse: data.warehouse,
      zone: data.zone,
      bin: data.bin,
      id: data.id,
      batchNumber: data.batchNumber,
      orderItems: [],
    };
    const savedEntity = await this.batchRepository.save(entity);
    const batch = this.inventoryBatchMapper.toDomain(savedEntity);
    this.eventBus.publish(new InventoryBatchAddedEvent(inventoryId, batch));
    return batch;
  }

  async findByMaterial(
    material: Material,
    grade: string,
    dimensions: Dimensions,
  ): Promise<Inventory | null> {
    const entity = await this.repository.findOne({
      where: {
        materialType: material,
        grade,
        length: dimensions.length,
        width: dimensions.width,
        thickness: dimensions.thickness,
      },
      relations: ['batches'],
    });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Inventory[]> {
    const entities = await this.repository.find({
      relations: ['batches'],
    });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findById(id: string): Promise<Inventory | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['batches'],
    });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async update(id: string, data: Inventory): Promise<Inventory> {
    const entity = this.mapper.toEntity(data);
    await this.repository.save(entity);
    const updatedEntity = await this.repository.findOne({
      where: { id },
      relations: ['batches'],
    });
    return this.mapper.toDomain(updatedEntity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private calculateQuantitiesFromEvents(
    events: InventoryEventEntity[],
  ): Quantities {
    const quantities: Quantities = {
      totalQuantity: 0,
      availableQuantity: 0,
      allocatedQuantity: 0,
    };

    for (const event of events) {
      if (event.eventType === InventoryEventType.RECEIVED) {
        quantities.totalQuantity += event.quantity;
        quantities.availableQuantity += event.quantity;
      } else if (event.eventType === InventoryEventType.ALLOCATED) {
        quantities.allocatedQuantity += event.quantity;
        quantities.availableQuantity -= event.quantity;
      } else if (event.eventType === InventoryEventType.SHIPPED) {
        quantities.availableQuantity -= event.quantity;
        quantities.allocatedQuantity -= event.quantity;
        quantities.totalQuantity -= event.quantity;
      } else if (event.eventType === InventoryEventType.ADJUSTED) {
        quantities.availableQuantity += event.quantity;
        quantities.totalQuantity += event.quantity;
      }
    }

    return quantities;
  }

  async getQuantities(inventoryId: string): Promise<Quantities> {
    const entity = await this.repository.findOne({
      where: { id: inventoryId },
    });
    if (!entity) {
      throw new NotFoundException('Inventory not found');
    }
    const inventoryEvents = await this.inventoryEventRepository.find({
      where: { inventory: { id: inventoryId } },
    });

    return this.calculateQuantitiesFromEvents(inventoryEvents);
  }

  /**
   * Returns the batches that can be used to fulfill the order.
   * The batches are sorted by receivedAt date.
   * The quantity is the quantity of the batch that can be used to fulfill the order.
   */
  async getQuantitiesForOrder(
    inventoryId: string,
    quantityRequired: number,
  ): Promise<{
    batches: {
      batchId: string;
      quantity: number;
    }[];
  }> {
    const entity = await this.repository.findOne({
      where: { id: inventoryId },
    });
    if (!entity) {
      throw new NotFoundException('Inventory not found');
    }

    // Sort the batches by receivedAt date
    const inventoryBatches = await this.findBatchesByInventoryId(inventoryId);
    const sortedBatches = inventoryBatches.sort(
      (a, b) => a.receivedAt.getTime() - b.receivedAt.getTime(),
    );

    const batches: {
      batchId: string;
      quantity: number;
    }[] = [];

    let remainingQuantity = quantityRequired;

    for (const batch of sortedBatches) {
      if (remainingQuantity <= 0) {
        break;
      }

      const availableQuantity = await this.findAvailableQuantityForBatch(
        batch.id,
      );

      batches.push({
        batchId: batch.id,
        quantity: Math.min(
          availableQuantity.availableQuantity,
          remainingQuantity,
        ),
      });
      remainingQuantity -= availableQuantity.availableQuantity;
    }

    return { batches };
  }

  async findAvailableQuantityForBatch(batchId: string): Promise<Quantities> {
    const inventoryEvents = await this.inventoryEventRepository.find({
      where: { batchId },
    });

    return this.calculateQuantitiesFromEvents(inventoryEvents);
  }

  async findBatchById(id: string): Promise<InventoryBatch | null> {
    const entity = await this.batchRepository.findOne({
      where: { id },
      relations: ['inventory', 'supplier'],
    });
    return entity ? this.inventoryBatchMapper.toDomain(entity) : null;
  }

  async createInventoryEvent(event: InventoryEvent): Promise<InventoryEvent> {
    const inventory = await this.repository.findOne({
      where: { id: event.inventoryId },
    });
    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    const entity: InventoryEventEntity = {
      id: event.id,
      eventType: event.eventType,
      batchId: event.batchId,
      purchaseOrderId: event.purchaseOrderId,
      orderId: event.orderId,
      quantity: event.quantity,
      inventory,
      createdAt: event.createdAt,
    };

    const savedEntity = await this.inventoryEventRepository.save(entity);
    return this.inventoryEventMapper.toDomain(savedEntity);
  }

  async findBatchesByInventoryId(
    inventoryId: string,
  ): Promise<InventoryBatch[]> {
    const entity = await this.batchRepository.find({
      where: { inventory: { id: inventoryId } },
      relations: ['supplier', 'inventory'],
    });
    return entity.map((entity) => this.inventoryBatchMapper.toDomain(entity));
  }

  async updateBatch(batch: InventoryBatch): Promise<InventoryBatch> {
    const entity = this.inventoryBatchMapper.toEntity(batch);
    await this.batchRepository.save(entity);
    const updatedEntity = await this.batchRepository.findOne({
      where: { id: batch.id },
      relations: ['inventory', 'supplier'],
    });
    return this.inventoryBatchMapper.toDomain(updatedEntity);
  }
}
