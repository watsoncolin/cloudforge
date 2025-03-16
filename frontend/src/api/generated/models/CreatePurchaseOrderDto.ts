/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
  status: string;
  /**
   * The items in the purchase order
   */
  items: Array<string>;
  /**
   * The expected delivery date
   */
  expectedDeliveryDate: string;
  /**
   * The currency of the purchase order
   */
  currency: string;
};

