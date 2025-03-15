/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCustomerDto } from '../models/CreateCustomerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CustomersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public customersControllerCreateCustomer(
    requestBody: CreateCustomerDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/customers',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public customersControllerGetAllCustomers(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/customers',
    });
  }
  /**
   * @param id
   * @returns any
   * @throws ApiError
   */
  public customersControllerGetCustomerById(
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/customers/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id
   * @returns any
   * @throws ApiError
   */
  public customersControllerUpdateCustomer(
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/customers/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id
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
    });
  }
}
