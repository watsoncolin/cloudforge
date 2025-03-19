import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SequenceService } from '../../../core/sequence/services/sequence.service';
import { ConvertToOrderCommand } from './convert-to-order.command';
import { Order } from 'src/domain/order/order';
import { QuoteRepository } from 'src/modules/quotes/repositories/quote.repository';
import { InventoryEventType, OrderStatus, QuoteStatus } from 'src/enums';
import { v4 as uuidv4 } from 'uuid';
import { OrderRepository } from '../../repositories/order.repository';
import { OrderItem } from 'src/domain/order/order-item';
import { InventoryRepository } from 'src/modules/inventory/repositories/inventory.repository';
import { InventoryEvent } from 'src/domain/inventory/inventory-event';
import { QuoteService } from 'src/modules/quotes/quote.service';
import { InventoryService } from 'src/modules/inventory/inventory.service';
import { NotAcceptableException } from '@nestjs/common';
@CommandHandler(ConvertToOrderCommand)
export class ConvertToOrderHandler
  implements ICommandHandler<ConvertToOrderCommand>
{
  constructor(
    private readonly quoteService: QuoteService,
    private readonly sequenceService: SequenceService,
    private readonly orderRepository: OrderRepository,
    private readonly inventoryService: InventoryService,
    // TODO: move the functions to the inventory service
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(command: ConvertToOrderCommand): Promise<Order> {
    const quote = command.quote;
    if (!quote) {
      throw new Error('Quote not found');
    }

    const readableId =
      await this.sequenceService.getNextSequenceNumber('ORDER');
    const orderId = uuidv4();
    const newOrder: Order = {
      id: orderId,
      readableId,
      quoteId: quote.id,
      customerId: quote.customerId,
      items: [],
      status: OrderStatus.PENDING,
      createdAt: quote.createdAt,
      updatedAt: quote.updatedAt,
    };

    // for each item in the quote, create an order item. Verify that the inventory is available. Create inventory events.
    const errors: Error[] = [];
    const orderItems: OrderItem[] = [];
    const inventoryEvents: InventoryEvent[] = [];
    for (const item of quote.items) {
      const inventory = await this.inventoryService.findByMaterial(
        item.materialType,
        item.grade,
        item.dimensions,
      );

      if (!inventory) {
        errors.push(
          new Error(
            `Inventory not available for ${item.materialType} ${item.grade} ${item.dimensions}`,
          ),
        );
        continue;
      }

      const quantities = await this.inventoryRepository.getQuantitiesForOrder(
        inventory.id,
        item.quantity,
      );

      if (!inventory) {
        throw new Error('Inventory not found');
      }

      // sum the quantities of the batches
      const quantity = quantities.batches.reduce(
        (acc, batch) => acc + batch.quantity,
        0,
      );

      const batchIds = quantities.batches.map((batch) => batch.batchId);

      if (quantity < item.quantity) {
        errors.push(
          new Error(
            `Inventory not available for ${item.materialType} ${item.grade} ${item.dimensions}`,
          ),
        );
        continue;
      }

      orderItems.push({
        id: uuidv4(),
        orderId: newOrder.id,
        inventoryId: inventory.id,
        batchIds,
        quantity: quantity,
        unitOfMeasure: item.unitOfMeasure,
        price: item.price,
        total: item.total,
      });

      for (const batch of quantities.batches) {
        inventoryEvents.push({
          id: uuidv4(),
          orderId: newOrder.id,
          inventoryId: inventory.id,
          batchId: batch.batchId,
          quantity: batch.quantity,
          eventType: InventoryEventType.ALLOCATED,
          createdAt: new Date(),
        });
      }
    }

    if (errors.length > 0) {
      throw new NotAcceptableException(errors.join('\n'));
    }

    newOrder.items.push(...orderItems);

    const order = await this.orderRepository.create(newOrder);
    await this.quoteService.updateStatus(quote.id, QuoteStatus.ORDERED);

    for (const event of inventoryEvents) {
      await this.inventoryRepository.createInventoryEvent(event);
    }

    return order;
  }
}
