/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DimensionsDto } from './DimensionsDto';
import type { QuantitiesDto } from './QuantitiesDto';
export type QuoteItemDto = {
  /**
   * The item ID
   */
  id: string;
  /**
   * The item inventory item id
   */
  materialType: string;
  /**
   * The item grade
   */
  grade: string;
  /**
   * The item dimensions
   */
  dimensions: DimensionsDto;
  /**
   * The item quantity
   */
  quantity: number;
  /**
   * The item unit of measure
   */
  unitOfMeasure: QuoteItemDto.unitOfMeasure;
  /**
   * The item price
   */
  price: number;
  /**
   * The item total
   */
  total: number;
  /**
   * The inventory quantities
   */
  quantities: QuantitiesDto;
};
export namespace QuoteItemDto {
  /**
   * The item unit of measure
   */
  export enum unitOfMeasure {
    LBS = 'lbs',
    TONS = 'tons',
    SHEETS = 'sheets',
    PIECES = 'pieces',
  }
}

