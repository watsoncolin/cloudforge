/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchDetailsResponseDto } from '../models/BatchDetailsResponseDto';
import type { InventoryDto } from '../models/InventoryDto';
import type { UpdateBatchLocationDto } from '../models/UpdateBatchLocationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class InventoryService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Get all inventory
   * @returns InventoryDto List of all inventory
   * @throws ApiError
   */
  public inventoryControllerGetAllInventory(): CancelablePromise<Array<InventoryDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory',
    });
  }
  /**
   * Get a inventory by ID
   * @param id Inventory ID
   * @returns InventoryDto Inventory found
   * @throws ApiError
   */
  public inventoryControllerGetInventoryById(
    id: string,
  ): CancelablePromise<InventoryDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Inventory not found`,
      },
    });
  }
  /**
   * Get a batch by ID
   * @param inventoryId
   * @param batchId
   * @returns BatchDetailsResponseDto Batch found
   * @throws ApiError
   */
  public inventoryBatchControllerGetBatchById(
    inventoryId: string,
    batchId: string,
  ): CancelablePromise<BatchDetailsResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/{inventoryId}/batch/{batchId}',
      path: {
        'inventoryId': inventoryId,
        'batchId': batchId,
      },
    });
  }
  /**
   * Update a batch location
   * @param inventoryId
   * @param batchId
   * @param requestBody
   * @returns any Batch location updated
   * @throws ApiError
   */
  public inventoryBatchControllerUpdateBatchLocation(
    inventoryId: string,
    batchId: string,
    requestBody: UpdateBatchLocationDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/inventory/{inventoryId}/batch/{batchId}/location',
      path: {
        'inventoryId': inventoryId,
        'batchId': batchId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
