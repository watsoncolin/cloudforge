/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WarehouseLocation } from './WarehouseLocation';
export type BatchDto = {
  /**
   * The ID of the batch
   */
  id: string;
  /**
   * The supplier ID of the batch
   */
  supplierId: string;
  /**
   * The purchase order ID of the batch
   */
  purchaseOrderId: string;
  /**
   * The purchase order item ID of the batch
   */
  purchaseOrderItemId: string;
  /**
   * The location of the batch
   */
  location: WarehouseLocation;
  /**
   * The batch number of the batch
   */
  batchNumber: string;
  /**
   * The heat number of the batch
   */
  heatNumber: string;
  /**
   * The mill certification of the batch
   */
  millCertification: string;
  /**
   * The created at of the batch
   */
  createdAt: string;
  /**
   * The total quantity of the batch
   */
  totalQuantity: number;
  /**
   * The available quantity of the batch
   */
  availableQuantity: number;
  /**
   * The allocated quantity of the batch
   */
  allocatedQuantity: number;
};

