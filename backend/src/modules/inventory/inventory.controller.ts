import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { InventoryWithQuantities } from 'src/domain/inventory/inventory-with-quantities';
import { InventoryDto } from './dto/inventory.dto';
import { InventoryBatch } from 'src/domain/inventory/inventory-batch';
import { BatchDto } from './dto/batch.dto';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all inventory' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all inventory',
    type: [InventoryDto],
  })
  async getAllInventory(): Promise<InventoryDto[]> {
    const inventory = await this.inventoryService.findAll();
    return inventory.map((inventory) => this.mapInventoryToDto(inventory, []));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a inventory by ID' })
  @ApiParam({ name: 'id', description: 'Inventory ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventory found',
    type: InventoryDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Inventory not found',
  })
  async getInventoryById(@Param('id') id: string): Promise<InventoryDto> {
    const inventory = await this.inventoryService.findOne(id);
    const batches = await this.inventoryService.findBatchesByInventoryId(id);
    return this.mapInventoryToDto(inventory, batches);
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
