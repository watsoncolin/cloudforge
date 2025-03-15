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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../commands/create-customer.command';
import { UpdateCustomerCommand } from '../commands/update-customer.command';
import { DeleteCustomerCommand } from '../commands/delete-customer.command';
import {
  GetCustomerByIdQuery,
  GetAllCustomersQuery,
} from '../queries/get-customer.query';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { Customer } from '../entities/customer.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Customer created successfully',
    type: Customer,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiBody({ type: CreateCustomerDto })
  async createCustomer(@Body() dto: CreateCustomerDto): Promise<Customer> {
    const command = new CreateCustomerCommand(
      dto.name,
      dto.contactName,
      dto.contactEmail,
      dto.contactPhone,
      dto.address,
      dto.city,
      dto.country,
      dto.stateProvince,
      dto.zipCode,
      dto.paymentTerms,
    );
    return this.commandBus.execute(command);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all customers',
    type: [Customer],
  })
  async getAllCustomers(): Promise<Customer[]> {
    return this.queryBus.execute(new GetAllCustomersQuery());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer found',
    type: Customer,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Customer not found',
  })
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.queryBus.execute(new GetCustomerByIdQuery(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer updated successfully',
    type: Customer,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Customer not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async updateCustomer(
    @Param('id') id: string,
    @Body() data: Partial<Customer>,
  ): Promise<Customer> {
    const command = new UpdateCustomerCommand(id, data);
    return this.commandBus.execute(command);
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
    const command = new DeleteCustomerCommand(id);
    await this.commandBus.execute(command);
  }
}
