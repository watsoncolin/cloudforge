/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCustomerDto } from '../models/CreateCustomerDto';
import type { CustomerDto } from '../models/CustomerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CustomersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Create a new customer
   * @param requestBody
   * @returns CustomerDto Customer created successfully
   * @throws ApiError
   */
  public customersControllerCreateCustomer(
    requestBody: CreateCustomerDto,
  ): CancelablePromise<CustomerDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/customers',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid input`,
      },
    });
  }
  /**
   * Get all customers
   * @returns CustomerDto List of all customers
   * @throws ApiError
   */
  public customersControllerGetAllCustomers(): CancelablePromise<Array<CustomerDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/customers',
    });
  }
  /**
   * Get a customer by ID
   * @param id Customer ID
   * @returns CustomerDto Customer found
   * @throws ApiError
   */
  public customersControllerGetCustomerById(
    id: string,
  ): CancelablePromise<CustomerDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/customers/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Customer not found`,
      },
    });
  }
  /**
   * Update a customer
   * @param id Customer ID
   * @param requestBody
   * @returns CustomerDto Customer updated successfully
   * @throws ApiError
   */
  public customersControllerUpdateCustomer(
    id: string,
    requestBody: CreateCustomerDto,
  ): CancelablePromise<CustomerDto> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/customers/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid input`,
        404: `Customer not found`,
      },
    });
  }
  /**
   * Delete a customer
   * @param id Customer ID
   * @returns void
   * @throws ApiError
   */
  public customersControllerDeleteCustomer(
    id: string,
  ): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/customers/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Customer not found`,
      },
    });
  }
}
