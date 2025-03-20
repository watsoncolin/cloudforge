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
  NotImplementedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CustomersService } from 'src/modules/customers/customers.service';
import { OrderService } from '../order.service';
import { OrderDto, OrderItemDto } from '../dtos/order.dto';
import { Order } from 'src/domain/order/order';
import { OrderItem } from 'src/domain/order/order-item';
import { InventoryService } from 'src/modules/inventory/inventory.service';
import { InventoryRepository } from 'src/modules/inventory/repositories/inventory.repository';
@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly customersService: CustomersService,
    private readonly inventoryService: InventoryService,
    //TODO: Remove this
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all Orders',
    type: [OrderDto],
  })
  async getAllOrders(): Promise<OrderDto[]> {
    const orders = await this.orderService.findAll();

    return await Promise.all(orders.map((order) => this.mapOrderToDto(order)));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Order found',
    type: OrderDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Order not found',
  })
  async getOrderById(@Param('id') id: string): Promise<OrderDto> {
    const order = await this.orderService.findById(id);
    return this.mapOrderToDto(order);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Get all Orders for a Customer' })
  @ApiParam({ name: 'customerId', description: 'Customer ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all Orders for the specified Customer',
    type: [OrderDto],
  })
  async getAllOrdersForCustomer(
    @Param('customerId') customerId: string,
  ): Promise<OrderDto[]> {
    const orders = await this.orderService.findAllForCustomer(customerId);
    return await Promise.all(orders.map((order) => this.mapOrderToDto(order)));
  }

  private async mapOrderToDto(order: Order): Promise<OrderDto> {
    const customer = await this.customersService.findOne(order.customerId);
    return {
      id: order.id,
      readableId: order.readableId,
      customerId: order.customerId,
      customerName: customer.name,
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
