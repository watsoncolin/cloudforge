import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { QuoteDto, QuoteItemDto } from '../dtos/quote.dto';
import { Quote } from 'src/domain/quote/quote';
import { CustomerDto } from 'src/modules/customers/dtos/customer.dto';
import { CustomersService } from 'src/modules/customers/customers.service';
import { QuoteService } from '../quote.service';
import { OrderDto, OrderItemDto } from 'src/modules/orders/dtos/order.dto';
import { Order } from 'src/domain/order/order';
import { OrderItem } from 'src/domain/order/order-item';
import { InventoryService } from 'src/modules/inventory/inventory.service';
import { QuoteItem } from 'src/domain/quote/quote-item';
import { InventoryRepository } from 'src/modules/inventory/repositories/inventory.repository';
@ApiTags('Quotes')
@Controller('quotes')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly customersService: CustomersService,
    private readonly inventoryService: InventoryService,
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Quotes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all Quotes',
    type: [QuoteDto],
  })
  async getAllQuotes(): Promise<QuoteDto[]> {
    const quotes = await this.quoteService.findAll();
    // TODO: improve this to use a batch request
    const customers = await Promise.all(
      quotes.map((quote) => this.customersService.findOne(quote.customerId)),
    );
    return await Promise.all(
      quotes.map((quote, index) => this.mapQuoteToDto(quote, customers[index])),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Quote by ID' })
  @ApiParam({ name: 'id', description: 'Quote ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Quote found',
    type: QuoteDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Quote not found',
  })
  async getQuoteById(@Param('id') id: string): Promise<QuoteDto> {
    const quote = await this.quoteService.findOne(id);
    const customer = await this.customersService.findOne(quote.customerId);
    return this.mapQuoteToDto(quote, customer);
  }

  @Post(':id/convert-to-order')
  @ApiOperation({ summary: 'Convert a Quote to an Order' })
  @ApiParam({ name: 'id', description: 'Quote ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Quote converted to Order',
    type: OrderDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description:
      'Quote not in a valid state to be converted to an Order. Check the inventory availability.',
  })
  async convertToOrder(@Param('id') id: string): Promise<OrderDto> {
    const quote = await this.quoteService.findOne(id);
    const order = await this.quoteService.convertToOrder(quote);
    return this.mapOrderToDto(order);
  }

  private async mapQuoteToDto(
    quote: Quote,
    customer: CustomerDto,
  ): Promise<QuoteDto> {
    return {
      id: quote.id,
      readableId: quote.readableId,
      customerId: quote.customerId,
      customer: customer,
      items: await Promise.all(
        quote.items.map((item) => this.mapQuoteItemToDto(item)),
      ),
      status: quote.status,
      createdAt: quote.createdAt,
      updatedAt: quote.updatedAt,
    };
  }

  private async mapQuoteItemToDto(item: QuoteItem): Promise<QuoteItemDto> {
    const inventory = await this.inventoryService.findByMaterial(
      item.materialType,
      item.grade,
      item.dimensions,
    );
    return {
      ...item,
      quantities: {
        available: inventory?.quantities.availableQuantity,
        allocated: inventory?.quantities.allocatedQuantity,
        total: inventory?.quantities.totalQuantity,
      },
    };
  }

  private async mapOrderToDto(order: Order): Promise<OrderDto> {
    return {
      id: order.id,
      readableId: order.readableId,
      customerId: order.customerId,
      quoteId: order.quoteId,
      status: order.status,
      items: await Promise.all(
        order.items.map((item) => this.mapOrderItemToDto(item)),
      ),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  private async mapOrderItemToDto(item: OrderItem): Promise<OrderItemDto> {
    const inventory = await this.inventoryService.findOne(item.inventoryId);
    const batches = await this.inventoryRepository.findBatchesByInventoryId(
      item.inventoryId,
    );
    return {
      id: item.id,
      inventoryId: item.inventoryId,
      inventory: {
        id: inventory.id,
        materialType: inventory.materialType,
        grade: inventory.grade,
        dimensions: inventory.dimensions,
        unitOfMeasure: inventory.unitOfMeasure,
        totalQuantity: inventory.quantities.totalQuantity,
        availableQuantity: inventory.quantities.availableQuantity,
        allocatedQuantity: inventory.quantities.allocatedQuantity,
        reorderStatus: null,
        batches: [],
      },
      batchIds: item.batchIds,
      quantity: item.quantity,
      unitOfMeasure: item.unitOfMeasure,
      price: item.price,
      total: item.total,
      batches: batches
        .filter((batch) => item.batchIds.includes(batch.id))
        .map((batch) => ({
          id: batch.id,
          quantity: batch.quantity,
          location: {
            warehouse: batch.warehouse,
            zone: batch.zone,
            bin: batch.bin,
          },
          purchaseOrderItemId: batch.purchaseOrderItemId,
          createdAt: batch.receivedAt,
          batchNumber: batch.batchNumber,
          heatNumber: batch.heatNumber,
          millCertification: batch.millCertUrl,
          supplierId: batch.supplierId,
          purchaseOrderId: batch.purchaseOrderId,
          totalQuantity: batch.quantity,
          // TODO: remove these
          availableQuantity: batch.quantity,
          allocatedQuantity: batch.quantity,
        })),
    };
  }
}
