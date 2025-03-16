/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PurchaseOrderItemDto } from './PurchaseOrderItemDto';
export type CreatePurchaseOrderDto = {
  /**
   * The supplier id
   */
  supplierId: string;
  /**
   * The order date
   */
  orderDate: string;
  /**
   * The status of the purchase order
   */
  status: CreatePurchaseOrderDto.status;
  /**
   * The items in the purchase order
   */
  items: Array<PurchaseOrderItemDto>;
  /**
   * The expected delivery date. Format: YYYY-MM-DD
   */
  expectedDeliveryDate: string;
  /**
   * The currency of the purchase order
   */
  currency: string;
};
export namespace CreatePurchaseOrderDto {
  /**
   * The status of the purchase order
   */
  export enum status {
    PENDING_APPROVAL = 'Pending Approval',
    APPROVED = 'Approved',
    SHIPPED = 'Shipped',
    RECEIVED = 'Received',
    CANCELLED = 'Cancelled',
  }
}

