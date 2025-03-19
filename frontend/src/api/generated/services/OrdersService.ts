/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderDto } from '../models/OrderDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OrdersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Get all Orders
   * @returns OrderDto List of all Orders
   * @throws ApiError
   */
  public orderControllerGetAllOrders(): CancelablePromise<Array<OrderDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/orders',
    });
  }
  /**
   * Get an Order by ID
   * @param id Order ID
   * @returns OrderDto Order found
   * @throws ApiError
   */
  public orderControllerGetOrderById(
    id: string,
  ): CancelablePromise<OrderDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/orders/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Order not found`,
      },
    });
  }
  /**
   * Get all Orders for a Customer
   * @param customerId Customer ID
   * @returns OrderDto List of all Orders for the specified Customer
   * @throws ApiError
   */
  public orderControllerGetAllOrdersForCustomer(
    customerId: string,
  ): CancelablePromise<Array<OrderDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/orders/customer/{customerId}',
      path: {
        'customerId': customerId,
      },
    });
  }
}
