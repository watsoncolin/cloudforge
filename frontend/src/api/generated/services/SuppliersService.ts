/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSupplierDto } from '../models/CreateSupplierDto';
import type { SupplierDto } from '../models/SupplierDto';
import type { UpdateSupplierDto } from '../models/UpdateSupplierDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SuppliersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Create a new supplier
   * @param requestBody
   * @returns SupplierDto The supplier has been successfully created.
   * @throws ApiError
   */
  public suppliersControllerCreate(
    requestBody: CreateSupplierDto,
  ): CancelablePromise<SupplierDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/suppliers',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Get all active suppliers
   * @returns SupplierDto List of all active suppliers.
   * @throws ApiError
   */
  public suppliersControllerFindAll(): CancelablePromise<Array<SupplierDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/suppliers',
    });
  }
  /**
   * Get a supplier by id
   * @param id
   * @returns SupplierDto The supplier.
   * @throws ApiError
   */
  public suppliersControllerFindOne(
    id: string,
  ): CancelablePromise<SupplierDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/suppliers/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Supplier not found.`,
      },
    });
  }
  /**
   * Update a supplier
   * @param id
   * @param requestBody
   * @returns SupplierDto The supplier has been successfully updated.
   * @throws ApiError
   */
  public suppliersControllerUpdate(
    id: string,
    requestBody: UpdateSupplierDto,
  ): CancelablePromise<SupplierDto> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/suppliers/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `Supplier not found.`,
      },
    });
  }
  /**
   * Soft delete a supplier
   * @param id
   * @returns any The supplier has been successfully deactivated.
   * @throws ApiError
   */
  public suppliersControllerRemove(
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/suppliers/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Supplier not found.`,
      },
    });
  }
}
