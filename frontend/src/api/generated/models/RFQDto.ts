/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerDto } from './CustomerDto';
import type { RFQItemDto } from './RFQItemDto';
export type RFQDto = {
  /**
   * The RFQ ID
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
   * The RFQ notes
   */
  notes: string;
  /**
   * The RFQ items
   */
  items: Array<RFQItemDto>;
  /**
   * The RFQ status
   */
  status: RFQDto.status;
  /**
   * The RFQ source
   */
  source: RFQDto.source;
  /**
   * The RFQ created at
   */
  createdAt: string;
  /**
   * The RFQ updated at
   */
  updatedAt: string;
};
export namespace RFQDto {
  /**
   * The RFQ status
   */
  export enum status {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    QUOTE = 'QUOTE',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
  }
  /**
   * The RFQ source
   */
  export enum source {
    MANUAL = 'MANUAL',
    AI = 'AI',
  }
}

