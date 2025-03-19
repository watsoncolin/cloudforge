/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
}
