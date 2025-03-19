/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePurchaseOrderDto } from '../models/CreatePurchaseOrderDto';
import type { PurchaseOrderDto } from '../models/PurchaseOrderDto';
import type { ReceivePurchaseOrderDto } from '../models/ReceivePurchaseOrderDto';
import type { UpdatePurchaseOrderDto } from '../models/UpdatePurchaseOrderDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PurchaseOrdersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Create a new purchase order
   * @param requestBody
   * @returns PurchaseOrderDto The purchase order has been successfully created.
   * @throws ApiError
   */
  public purchaseOrdersControllerCreate(
    requestBody: CreatePurchaseOrderDto,
  ): CancelablePromise<PurchaseOrderDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/purchase-orders',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Get all active purchase orders
   * @returns PurchaseOrderDto List of all active purchase orders.
   * @throws ApiError
   */
  public purchaseOrdersControllerFindAll(): CancelablePromise<Array<PurchaseOrderDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/purchase-orders',
    });
  }
  /**
   * Get a purchase order by id
   * @param id
   * @returns PurchaseOrderDto The purchase order.
   * @throws ApiError
   */
  public purchaseOrdersControllerFindOne(
    id: string,
  ): CancelablePromise<PurchaseOrderDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/purchase-orders/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Purchase order not found.`,
      },
    });
  }
  /**
   * Update a purchase order
   * @param id
   * @param requestBody
   * @returns PurchaseOrderDto The purchase order has been successfully updated.
   * @throws ApiError
   */
  public purchaseOrdersControllerUpdate(
    id: string,
    requestBody: UpdatePurchaseOrderDto,
  ): CancelablePromise<PurchaseOrderDto> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/purchase-orders/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `Purchase order not found.`,
      },
    });
  }
  /**
   * Soft delete a purchase order
   * @param id
   * @returns any The purchase order has been successfully deactivated.
   * @throws ApiError
   */
  public purchaseOrdersControllerRemove(
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/purchase-orders/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Purchase order not found.`,
      },
    });
  }
  /**
   * Approve a purchase order
   * @param id
   * @returns any The purchase order has been successfully approved.
   * @throws ApiError
   */
  public purchaseOrdersControllerApprove(
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/purchase-orders/{id}/approve',
      path: {
        'id': id,
      },
      errors: {
        400: `Purchase order is not pending approval.`,
        404: `Purchase order not found.`,
      },
    });
  }
  /**
   * Mark a purchase order as shipped
   * @param id
   * @returns any The purchase order has been successfully marked as shipped.
   * @throws ApiError
   */
  public purchaseOrdersControllerMarkShipped(
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/purchase-orders/{id}/mark-shipped',
      path: {
        'id': id,
      },
      errors: {
        400: `Purchase order is not approved.`,
        404: `Purchase order not found.`,
      },
    });
  }
  /**
   * Mark a purchase order as received
   * @param id
   * @param requestBody
   * @returns any The purchase order has been successfully marked as received.
   * @throws ApiError
   */
  public purchaseOrdersControllerMarkReceived(
    id: string,
    requestBody: ReceivePurchaseOrderDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/purchase-orders/{id}/mark-received',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Purchase order is not shipped.`,
        404: `Purchase order not found.`,
      },
    });
  }
}
