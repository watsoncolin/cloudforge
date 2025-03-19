/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItemDto } from './OrderItemDto';
export type OrderDto = {
  /**
   * The ID of the order
   */
  id: string;
  /**
   * The readable ID of the order
   */
  readableId: string;
  /**
   * The ID of the quote that the order is based on
   */
  quoteId: string;
  /**
   * The status of the order
   */
  status: OrderDto.status;
  /**
   * The ID of the customer that the order is for
   */
  customerId: string;
  /**
   * The items in the order
   */
  items: Array<OrderItemDto>;
  /**
   * The date and time the order was created
   */
  createdAt: string;
  /**
   * The date and time the order was updated
   */
  updatedAt: string;
};
export namespace OrderDto {
  /**
   * The status of the order
   */
  export enum status {
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
  }
}

