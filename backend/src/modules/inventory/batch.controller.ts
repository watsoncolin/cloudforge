import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { InventoryWithQuantities } from 'src/domain/inventory/inventory-with-quantities';
import { InventoryDto } from './dto/inventory.dto';
import { InventoryBatch } from 'src/domain/inventory/inventory-batch';
import { BatchDto } from './dto/batch.dto';
import { BatchDetailsResponseDto } from './dto/batch-details-response.dto';
import { UpdateBatchLocationDto } from './dto/update-batch-location.dto';
@ApiTags('inventory')
@Controller('inventory/:inventoryId/batch/:batchId')
export class InventoryBatchController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get a batch by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Batch found',
    type: BatchDetailsResponseDto,
  })
  async getBatchById(
    @Param('inventoryId') inventoryId: string,
    @Param('batchId') batchId: string,
  ): Promise<BatchDetailsResponseDto> {
    const inventory = await this.inventoryService.findOne(inventoryId);
    const batches =
      await this.inventoryService.findBatchesByInventoryId(inventoryId);
    const batch = batches.find((batch) => batch.id === batchId);
    if (!batch) {
      throw new NotFoundException('Batch not found');
    }

    return {
      id: batch.id,
      inventory: this.mapInventoryToDto(inventory, batches),
      batch: this.mapBatchToDto(batch),
    };
  }

  // update batch location
  @Put('location')
  @ApiOperation({ summary: 'Update a batch location' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Batch location updated',
  })
  @ApiBody({ type: UpdateBatchLocationDto })
  async updateBatchLocation(
    @Param('inventoryId') inventoryId: string,
    @Param('batchId') batchId: string,
    @Body() updateBatchLocationDto: UpdateBatchLocationDto,
  ): Promise<BatchDetailsResponseDto> {
    const inventory = await this.inventoryService.findOne(inventoryId);
    const batches =
      await this.inventoryService.findBatchesByInventoryId(inventoryId);
    const batch = batches.find((b) => b.id === batchId);
    if (!inventory || !batch) {
      throw new NotFoundException('Inventory or batch not found');
    }
    await this.inventoryService.updateBatch(
      inventoryId,
      batchId,
      updateBatchLocationDto,
    );
    return this.getBatchById(inventoryId, batchId);
  }

  private mapInventoryToDto(
    inventory: InventoryWithQuantities,
    batches: InventoryBatch[],
  ): InventoryDto {
    return {
      id: inventory.id,
      materialType: inventory.materialType,
      grade: inventory.grade,
      dimensions: inventory.dimensions,
      unitOfMeasure: inventory.unitOfMeasure,
      totalQuantity: inventory.quantities.totalQuantity,
      availableQuantity: inventory.quantities.availableQuantity,
      allocatedQuantity: inventory.quantities.allocatedQuantity,
      reorderStatus:
        // TODO: Replace with predictive reorder status
        inventory.quantities.availableQuantity < 10
          ? 'Low Stock'
          : inventory.quantities.availableQuantity < 0
            ? 'Out of Stock'
            : 'Good',
      batches: batches.map(this.mapBatchToDto),
    };
  }

  private mapBatchToDto(batch: InventoryBatch): BatchDto {
    return {
      id: batch.id,
      location: {
        warehouse: batch.warehouse,
        zone: batch.zone,
        bin: batch.bin,
      },
      supplierId: batch.supplierId,
      purchaseOrderId: batch.purchaseOrderId,
      purchaseOrderItemId: batch.purchaseOrderItemId,
      batchNumber: batch.batchNumber,
      heatNumber: batch.heatNumber,
      millCertification: batch.millCertUrl,
      createdAt: batch.receivedAt,
      totalQuantity: batch.quantity,
      availableQuantity: batch.quantity,
      allocatedQuantity: batch.quantity,
    };
  }
}
