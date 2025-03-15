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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';
import { plainToInstance } from 'class-transformer';

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
    type: CustomerDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiBody({ type: CreateCustomerDto })
  async createCustomer(@Body() dto: CreateCustomerDto): Promise<CustomerDto> {
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
    const customer = await this.commandBus.execute(command);
    return plainToInstance(CustomerDto, customer);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all customers',
    type: [CustomerDto],
  })
  async getAllCustomers(): Promise<CustomerDto[]> {
    const customers = await this.queryBus.execute(new GetAllCustomersQuery());
    return customers.map((customer) => plainToInstance(CustomerDto, customer));
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
    const customer = await this.queryBus.execute(new GetCustomerByIdQuery(id));
    return plainToInstance(CustomerDto, customer);
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
    @Body() data: Partial<Customer>,
  ): Promise<CustomerDto> {
    const command = new UpdateCustomerCommand(id, data);
    const customer = await this.commandBus.execute(command);
    return plainToInstance(CustomerDto, customer);
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
