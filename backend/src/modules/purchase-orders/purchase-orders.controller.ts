import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PurchaseOrdersService } from './purchase-orders.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { PurchaseOrderDto } from './dto/purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
import { ReceivePurchaseOrderDto } from './dto/receive-purchase-order.dto';
@ApiTags('purchase-orders')
@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new purchase order' })
  @ApiResponse({
    status: 201,
    description: 'The purchase order has been successfully created.',
    type: PurchaseOrderDto,
  })
  async create(
    @Body() createPurchaseOrderDto: CreatePurchaseOrderDto,
  ): Promise<PurchaseOrderDto> {
    const purchaseOrder = await this.purchaseOrdersService.create(
      createPurchaseOrderDto,
    );
    return this.mapPurchaseOrderToDto(purchaseOrder);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active purchase orders' })
  @ApiResponse({
    status: 200,
    description: 'List of all active purchase orders.',
    type: [PurchaseOrderDto],
  })
  async findAll(): Promise<PurchaseOrderDto[]> {
    const purchaseOrders = await this.purchaseOrdersService.findAll();
    return purchaseOrders.map((purchaseOrder) =>
      this.mapPurchaseOrderToDto(purchaseOrder),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a purchase order by id' })
  @ApiResponse({
    status: 200,
    description: 'The purchase order.',
    type: PurchaseOrderDto,
  })
  @ApiResponse({ status: 404, description: 'Purchase order not found.' })
  async findOne(@Param('id') id: string): Promise<PurchaseOrderDto> {
    const purchaseOrder = await this.purchaseOrdersService.findOne(id);
    return this.mapPurchaseOrderToDto(purchaseOrder);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a purchase order' })
  @ApiResponse({
    status: 200,
    description: 'The purchase order has been successfully updated.',
    type: PurchaseOrderDto,
  })
  @ApiResponse({ status: 404, description: 'Purchase order not found.' })
  async update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ): Promise<PurchaseOrderDto> {
    const purchaseOrder = await this.purchaseOrdersService.update(
      id,
      updatePurchaseOrderDto,
    );
    return this.mapPurchaseOrderToDto(purchaseOrder);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a purchase order' })
  @ApiResponse({
    status: 200,
    description: 'The purchase order has been successfully deactivated.',
  })
  @ApiResponse({ status: 404, description: 'Purchase order not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.purchaseOrdersService.remove(id);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve a purchase order' })
  @ApiResponse({
    status: 200,
    description: 'The purchase order has been successfully approved.',
  })
  @ApiResponse({ status: 404, description: 'Purchase order not found.' })
  @ApiResponse({
    status: 400,
    description: 'Purchase order is not pending approval.',
  })
  async approve(@Param('id') id: string): Promise<PurchaseOrderDto> {
    // TODO add authorization check using a role guard

    const purchaseOrder = await this.purchaseOrdersService.approve(id);
    return this.mapPurchaseOrderToDto(purchaseOrder);
  }

  @Post(':id/mark-shipped')
  @ApiOperation({ summary: 'Mark a purchase order as shipped' })
  @ApiResponse({
    status: 200,
    description: 'The purchase order has been successfully marked as shipped.',
  })
  @ApiResponse({ status: 404, description: 'Purchase order not found.' })
  @ApiResponse({
    status: 400,
    description: 'Purchase order is not approved.',
  })
  async markShipped(@Param('id') id: string): Promise<PurchaseOrderDto> {
    const purchaseOrder = await this.purchaseOrdersService.markShipped(id);
    return this.mapPurchaseOrderToDto(purchaseOrder);
  }

  @Post(':id/mark-received')
  @ApiOperation({ summary: 'Mark a purchase order as received' })
  @ApiResponse({
    status: 200,
    description: 'The purchase order has been successfully marked as received.',
  })
  @ApiResponse({ status: 404, description: 'Purchase order not found.' })
  @ApiResponse({
    status: 400,
    description: 'Purchase order is not shipped.',
  })
  async markReceived(
    @Param('id') id: string,
    @Body() receivePurchaseOrderDto: ReceivePurchaseOrderDto,
  ): Promise<PurchaseOrderDto> {
    const purchaseOrder = await this.purchaseOrdersService.markReceived(
      id,
      receivePurchaseOrderDto,
    );
    return this.mapPurchaseOrderToDto(purchaseOrder);
  }

  private mapPurchaseOrderToDto(
    purchaseOrder: PurchaseOrder,
  ): PurchaseOrderDto {
    return {
      id: purchaseOrder.id,
      readableId: purchaseOrder.readableId,
      supplierId: purchaseOrder.supplierId,
      orderDate: purchaseOrder.orderDate,
      status: purchaseOrder.status,
      totalPrice: purchaseOrder.totalPrice,
      items: purchaseOrder.items.map((item) => ({
        id: item.id,
        materialType: item.materialType,
        grade: item.grade,
        dimensions: {
          length: item.dimensions.length,
          width: item.dimensions.width,
          thickness: item.dimensions.thickness,
        },
        quantity: item.quantity,
        unitOfMeasure: item.unitOfMeasure,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })),
      currency: purchaseOrder.currency,
      createdAt: purchaseOrder.createdAt.toISOString(),
      updatedAt: purchaseOrder.updatedAt.toISOString(),
      expectedDeliveryDate: purchaseOrder.expectedDeliveryDate.toISOString(),
    };
  }
}
