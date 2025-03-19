/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PurchaseOrderItemDto } from './PurchaseOrderItemDto';
export type PurchaseOrderDto = {
  /**
   * The unique identifier of the purchase order
   */
  id: string;
  /**
   * The readable identifier of the purchase order
   */
  readableId: string;
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
  status: PurchaseOrderDto.status;
  /**
   * The items in the purchase order
   */
  items: Array<PurchaseOrderItemDto>;
  /**
   * The total price of the purchase order
   */
  totalPrice: number;
  /**
   * The currency of the purchase order
   */
  currency: string;
  /**
   * The expected delivery date
   */
  expectedDeliveryDate: string;
  /**
   * The created at date
   */
  createdAt: string;
  /**
   * The updated at date
   */
  updatedAt: string;
};
export namespace PurchaseOrderDto {
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

