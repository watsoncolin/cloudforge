import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { SupplierDto } from './dto/supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiResponse({
    status: 201,
    description: 'The supplier has been successfully created.',
    type: SupplierDto,
  })
  create(@Body() createSupplierDto: CreateSupplierDto): Promise<SupplierDto> {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active suppliers' })
  @ApiResponse({
    status: 200,
    description: 'List of all active suppliers.',
    type: [SupplierDto],
  })
  findAll(): Promise<SupplierDto[]> {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a supplier by id' })
  @ApiResponse({ status: 200, description: 'The supplier.', type: SupplierDto })
  @ApiResponse({ status: 404, description: 'Supplier not found.' })
  async findOne(@Param('id') id: string): Promise<SupplierDto> {
    const supplier = await this.suppliersService.findOne(id);
    return {
      id: supplier.id,
      name: supplier.name,
      contact: supplier.contact,
      address: supplier.address,
      paymentTerm: supplier.paymentTerm,
      materials: supplier.materials,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a supplier' })
  @ApiResponse({
    status: 200,
    description: 'The supplier has been successfully updated.',
    type: SupplierDto,
  })
  @ApiResponse({ status: 404, description: 'Supplier not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<SupplierDto> {
    const supplier = await this.suppliersService.update(id, updateSupplierDto);
    return {
      id: supplier.id,
      name: supplier.name,
      contact: supplier.contact,
      address: supplier.address,
      paymentTerm: supplier.paymentTerm,
      materials: supplier.materials,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a supplier' })
  @ApiResponse({
    status: 200,
    description: 'The supplier has been successfully deactivated.',
  })
  @ApiResponse({ status: 404, description: 'Supplier not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.suppliersService.remove(id);
  }
}
