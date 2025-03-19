/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRFQDto } from '../models/CreateRFQDto';
import type { QuoteDto } from '../models/QuoteDto';
import type { RFQDto } from '../models/RFQDto';
import type { UpdateRFQDto } from '../models/UpdateRFQDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class RfQsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Create a new RFQ
   * @param requestBody
   * @returns RFQDto RFQ created successfully
   * @throws ApiError
   */
  public rfqControllerCreateRfq(
    requestBody: CreateRFQDto,
  ): CancelablePromise<RFQDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/rfqs',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid input`,
        409: `RFQ already exists`,
      },
    });
  }
  /**
   * Get all RFQs
   * @returns RFQDto List of all RFQs
   * @throws ApiError
   */
  public rfqControllerGetAllRfqs(): CancelablePromise<Array<RFQDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/rfqs',
    });
  }
  /**
   * Get a RFQ by ID
   * @param id RFQ ID
   * @returns RFQDto RFQ found
   * @throws ApiError
   */
  public rfqControllerGetRfqById(
    id: string,
  ): CancelablePromise<RFQDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/rfqs/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `RFQ not found`,
      },
    });
  }
  /**
   * Update a RFQ
   * @param id RFQ ID
   * @param requestBody
   * @returns RFQDto RFQ updated successfully
   * @throws ApiError
   */
  public rfqControllerUpdateRfq(
    id: string,
    requestBody: UpdateRFQDto,
  ): CancelablePromise<RFQDto> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/rfqs/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid input`,
        404: `RFQ not found`,
      },
    });
  }
  /**
   * Delete a RFQ
   * @param id RFQ ID
   * @returns void
   * @throws ApiError
   */
  public rfqControllerDeleteRfq(
    id: string,
  ): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/rfqs/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Customer not found`,
      },
    });
  }
  /**
   * Convert a RFQ to a Quote
   * @param id RFQ ID
   * @returns QuoteDto Quote created successfully
   * @throws ApiError
   */
  public rfqControllerConvertToQuote(
    id: string,
  ): CancelablePromise<QuoteDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/rfqs/{id}/convert-to-quote',
      path: {
        'id': id,
      },
    });
  }
}
