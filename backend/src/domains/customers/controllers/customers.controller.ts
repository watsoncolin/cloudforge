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
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CustomerDto } from '../dtos/customer.dto';
import { CustomersService } from '../customers.service';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Customer created successfully',
    type: CustomerDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiBody({ type: CreateCustomerDto })
  async createCustomer(@Body() dto: CreateCustomerDto): Promise<CustomerDto> {
    return this.customersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all customers',
    type: [CustomerDto],
  })
  async getAllCustomers(): Promise<CustomerDto[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer found',
    type: CustomerDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Customer not found',
  })
  async getCustomerById(@Param('id') id: string): Promise<CustomerDto> {
    return this.customersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer updated successfully',
    type: CustomerDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Customer not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async updateCustomer(
    @Param('id') id: string,
    @Body() data: Partial<CreateCustomerDto>,
  ): Promise<CustomerDto> {
    return this.customersService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Customer deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Customer not found',
  })
  async deleteCustomer(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(id);
  }
}
