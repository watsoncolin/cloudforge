/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WarehouseLocationDto } from './WarehouseLocationDto';
export type ReceivePurchaseOrderDto = {
  /**
   * The unique identifier of the purchase order line item from the purchase order
   */
  purchaseOrderItemId: string;
  /**
   * The batch number from the supplier of the purchase order item
   */
  batchNumber: string;
  /**
   * The warehouse location
   */
  warehouseLocation: WarehouseLocationDto;
  /**
   * The heat number of the purchase order item
   */
  heatNumber: string;
  /**
   * The mill cert url of the purchase order item
   */
  millCertUrl: string;
};

