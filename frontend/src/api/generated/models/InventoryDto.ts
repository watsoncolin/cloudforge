/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchDto } from './BatchDto';
import type { Dimensions } from './Dimensions';
export type InventoryDto = {
  /**
   * The ID of the inventory
   */
  id: string;
  /**
   * The material type of the inventory
   */
  materialType: string;
  /**
   * The grade of the inventory
   */
  grade: string;
  /**
   * The dimensions of the inventory
   */
  dimensions: Dimensions;
  /**
   * The unit of measure of the inventory
   */
  unitOfMeasure: string;
  /**
   * The total quantity of the inventory on hand
   */
  totalQuantity: number;
  /**
   * The available quantity of the inventory to be used
   */
  availableQuantity: number;
  /**
   * The allocated quantity of the inventory to existing unshipped orders
   */
  allocatedQuantity: number;
  /**
   * The reorder status of the inventory
   */
  reorderStatus: string;
  /**
   * The batches of the inventory
   */
  batches: Array<BatchDto>;
};

