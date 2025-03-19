/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateRFQItemDto } from './UpdateRFQItemDto';
export type UpdateRFQDto = {
  /**
   * The RFQ ID
   */
  id: string;
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
  items: Array<UpdateRFQItemDto>;
  /**
   * The RFQ status
   */
  status: UpdateRFQDto.status;
};
export namespace UpdateRFQDto {
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
}

