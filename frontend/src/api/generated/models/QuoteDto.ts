/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerDto } from './CustomerDto';
import type { QuoteItemDto } from './QuoteItemDto';
export type QuoteDto = {
  /**
   * The quote ID
   */
  id: string;
  /**
   * The readable ID
   */
  readableId: string;
  /**
   * The customer ID
   */
  customerId: string;
  /**
   * The customer dto
   */
  customer: CustomerDto;
  /**
   * The quote notes
   */
  notes: string;
  /**
   * The quote items
   */
  items: Array<QuoteItemDto>;
  /**
   * The quote status
   */
  status: QuoteDto.status;
  /**
   * The quote created at
   */
  createdAt: string;
  /**
   * The quote updated at
   */
  updatedAt: string;
};
export namespace QuoteDto {
  /**
   * The quote status
   */
  export enum status {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    QUOTE = 'QUOTE',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
    ORDERED = 'ORDERED',
  }
}

