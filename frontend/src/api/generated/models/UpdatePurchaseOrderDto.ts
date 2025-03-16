/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdatePurchaseOrderDto = {
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
  items: Array<string>;
  /**
   * The expected delivery date
   */
  expectedDeliveryDate: string;
};

