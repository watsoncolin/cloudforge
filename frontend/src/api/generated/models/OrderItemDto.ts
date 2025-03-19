/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchDto } from './BatchDto';
import type { InventoryDto } from './InventoryDto';
export type OrderItemDto = {
  /**
   * The ID of the order item
   */
  id: string;
  /**
   * The ID of the inventory that the order item is for
   */
  inventoryId: string;
  /**
   * The inventory that the order item is for
   */
  inventory: InventoryDto;
  /**
   * The IDs of the batches that the order item is for
   */
  batchIds: Array<string>;
  /**
   * The quantity of the order item
   */
  quantity: number;
  /**
   * The unit of measure of the order item
   */
  unitOfMeasure: string;
  /**
   * The price of the order item
   */
  price: number;
  /**
   * The total price of the order item
   */
  total: number;
  /**
   * The batches of the order item
   */
  batches: Array<BatchDto>;
};

