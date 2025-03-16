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
  status: string;
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

