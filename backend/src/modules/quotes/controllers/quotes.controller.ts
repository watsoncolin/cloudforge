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
import { QuoteDto } from '../dtos/quote.dto';
import { Quote } from 'src/domain/quote/quote';
import { CustomerDto } from 'src/modules/customers/dtos/customer.dto';
import { CustomersService } from 'src/modules/customers/customers.service';
import { QuoteService } from '../quote.service';

@ApiTags('Quotes')
@Controller('quotes')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly customersService: CustomersService,
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
    return quotes.map((quote, index) =>
      this.mapQuoteToDto(quote, customers[index]),
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
  })
  async convertToOrder(@Param('id') id: string): Promise<OrderDto> {
    const quote = await this.quoteService.findOne(id);
    const order = await this.orderService.create(quote);
    return this.mapOrderToDto(order);
  }

  private mapQuoteToDto(quote: Quote, customer: CustomerDto): QuoteDto {
    return {
      id: quote.id,
      readableId: quote.readableId,
      customerId: quote.customerId,
      customer: customer,
      items: quote.items,
      status: quote.status,
      createdAt: quote.createdAt,
      updatedAt: quote.updatedAt,
    };
  }
}
