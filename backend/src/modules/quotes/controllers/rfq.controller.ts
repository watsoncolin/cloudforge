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
import { RFQDto } from '../dtos/rfq.dto';
import { RFQ } from 'src/domain/quote/rfq';
import { RFQService } from '../rfq.service';
import { CreateRFQDto } from '../dtos/create-rfq.dto';
import { Customer } from 'src/domain/customer/customer';
import { CustomerDto } from 'src/modules/customers/dtos/customer.dto';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UpdateRFQDto } from '../dtos/update-rfq.dto';
import { InventoryService } from 'src/modules/inventory/inventory.service';
import { Material } from 'src/enums';
import { QuoteDto, QuoteItemDto } from '../dtos/quote.dto';
import { Quote } from 'src/domain/quote/quote';
import { QuoteItem } from 'src/domain/quote/quote-item';

@ApiTags('RFQs')
@Controller('rfqs')
export class RFQController {
  constructor(
    private readonly rfqService: RFQService,
    private readonly customersService: CustomersService,
    private readonly inventoryService: InventoryService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new RFQ' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'RFQ created successfully',
    type: RFQDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'RFQ already exists',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiBody({ type: CreateRFQDto })
  async createRfq(@Body() dto: CreateRFQDto): Promise<RFQDto> {
    const rfq = await this.rfqService.create(dto);
    const customer = await this.customersService.findOne(rfq.customerId);
    return this.mapRfqToDto(rfq, customer);
  }

  @Get()
  @ApiOperation({ summary: 'Get all RFQs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all RFQs',
    type: [RFQDto],
  })
  async getAllRfqs(): Promise<RFQDto[]> {
    const rfqs = await this.rfqService.findAll();
    // TODO: improve this to use a batch request
    const customers = await Promise.all(
      rfqs.map((rfq) => this.customersService.findOne(rfq.customerId)),
    );
    return rfqs.map((rfq, index) => this.mapRfqToDto(rfq, customers[index]));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a RFQ by ID' })
  @ApiParam({ name: 'id', description: 'RFQ ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'RFQ found',
    type: RFQDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'RFQ not found',
  })
  async getRfqById(@Param('id') id: string): Promise<RFQDto> {
    const rfq = await this.rfqService.findOne(id);
    const customer = await this.customersService.findOne(rfq.customerId);
    return this.mapRfqToDto(rfq, customer);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a RFQ' })
  @ApiParam({ name: 'id', description: 'RFQ ID' })
  @ApiBody({ type: UpdateRFQDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'RFQ updated successfully',
    type: RFQDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'RFQ not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiBody({ type: UpdateRFQDto })
  async updateRfq(
    @Param('id') id: string,
    @Body() data: UpdateRFQDto,
  ): Promise<RFQDto> {
    const rfq = await this.rfqService.update(id, data);
    const customer = await this.customersService.findOne(rfq.customerId);
    return this.mapRfqToDto(rfq, customer);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a RFQ' })
  @ApiParam({ name: 'id', description: 'RFQ ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'RFQ deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Customer not found',
  })
  async deleteRfq(@Param('id') id: string): Promise<void> {
    return this.rfqService.remove(id);
  }

  @Post(':id/convert-to-quote')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Convert a RFQ to a Quote' })
  @ApiParam({ name: 'id', description: 'RFQ ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Quote created successfully',
    type: QuoteDto,
  })
  async convertToQuote(@Param('id') id: string): Promise<QuoteDto> {
    const quote = await this.rfqService.convertToQuote(id);
    const customer = await this.customersService.findOne(quote.customerId);
    return this.mapQuoteToDto(quote, customer);
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

  private mapRfqToDto(rfq: RFQ, customer: CustomerDto): RFQDto {
    return {
      id: rfq.id,
      readableId: rfq.readableId,
      customerId: rfq.customerId,
      customer: customer,
      source: rfq.source,
      notes: rfq.notes,
      items: rfq.items,
      status: rfq.status,
      createdAt: rfq.createdAt,
      updatedAt: rfq.updatedAt,
    };
  }
}
