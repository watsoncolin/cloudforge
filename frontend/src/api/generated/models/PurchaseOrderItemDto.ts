/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DimensionsDto } from './DimensionsDto';
export type PurchaseOrderItemDto = {
  /**
   * The unique identifier of the purchase order item
   */
  id: string;
  /**
   * The material type
   */
  materialType: PurchaseOrderItemDto.materialType;
  /**
   * The grade of the material
   */
  grade: string;
  /**
   * The dimensions of the material
   */
  dimensions: DimensionsDto;
  /**
   * The quantity of the material
   */
  quantity: number;
  /**
   * The unit of measure
   */
  unitOfMeasure: PurchaseOrderItemDto.unitOfMeasure;
  /**
   * The unit price of the material
   */
  unitPrice: number;
  /**
   * The total price of the material
   */
  totalPrice: number;
};
export namespace PurchaseOrderItemDto {
  /**
   * The material type
   */
  export enum materialType {
    STEEL = 'steel',
    ALUMINUM = 'aluminum',
    COPPER = 'copper',
    STAINLESS_STEEL = 'stainless_steel',
  }
  /**
   * The unit of measure
   */
  export enum unitOfMeasure {
    LBS = 'lbs',
    TONS = 'tons',
    SHEETS = 'sheets',
    PIECES = 'pieces',
  }
}

