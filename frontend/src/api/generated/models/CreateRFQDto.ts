/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRFQItemDto } from './CreateRFQItemDto';
export type CreateRFQDto = {
  /**
   * The customer ID
   */
  customerId: string;
  /**
   * The RFQ notes
   */
  notes: string;
  /**
   * The RFQ items
   */
  items: Array<CreateRFQItemDto>;
  /**
   * The RFQ status
   */
  status: CreateRFQDto.status;
  /**
   * The RFQ source
   */
  source: CreateRFQDto.source;
};
export namespace CreateRFQDto {
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

