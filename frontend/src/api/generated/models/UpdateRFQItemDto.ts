/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DimensionsDto } from './DimensionsDto';
export type UpdateRFQItemDto = {
  /**
   * The item ID
   */
  id: string;
  /**
   * The item material type
   */
  materialType: UpdateRFQItemDto.materialType;
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
  unitOfMeasure: UpdateRFQItemDto.unitOfMeasure;
  /**
   * The item price
   */
  price: number;
  /**
   * The item total
   */
  total: number;
};
export namespace UpdateRFQItemDto {
  /**
   * The item material type
   */
  export enum materialType {
    STEEL = 'steel',
    ALUMINUM = 'aluminum',
    COPPER = 'copper',
    STAINLESS_STEEL = 'stainless_steel',
  }
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

