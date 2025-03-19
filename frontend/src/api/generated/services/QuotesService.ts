/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderDto } from '../models/OrderDto';
import type { QuoteDto } from '../models/QuoteDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class QuotesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Get all Quotes
   * @returns QuoteDto List of all Quotes
   * @throws ApiError
   */
  public quoteControllerGetAllQuotes(): CancelablePromise<Array<QuoteDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/quotes',
    });
  }
  /**
   * Get a Quote by ID
   * @param id Quote ID
   * @returns QuoteDto Quote found
   * @throws ApiError
   */
  public quoteControllerGetQuoteById(
    id: string,
  ): CancelablePromise<QuoteDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/quotes/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Quote not found`,
      },
    });
  }
  /**
   * Convert a Quote to an Order
   * @param id Quote ID
   * @returns OrderDto Quote converted to Order
   * @throws ApiError
   */
  public quoteControllerConvertToOrder(
    id: string,
  ): CancelablePromise<OrderDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/quotes/{id}/convert-to-order',
      path: {
        'id': id,
      },
      errors: {
        406: `Quote not in a valid state to be converted to an Order. Check the inventory availability.`,
      },
    });
  }
}
