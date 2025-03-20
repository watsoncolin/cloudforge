/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DimensionsDto } from './DimensionsDto';
export type RFQItemDto = {
  /**
   * The item ID
   */
  id: string;
  /**
   * The item inventory item id
   */
  materialType: string;
  /**
   * The item processing type
   */
  processingType: RFQItemDto.processingType;
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
  unitOfMeasure: RFQItemDto.unitOfMeasure;
  /**
   * The item price
   */
  price: number;
  /**
   * The item total
   */
  total: number;
};
export namespace RFQItemDto {
  /**
   * The item processing type
   */
  export enum processingType {
    HRB = 'HRB',
    HRPO = 'HRPO',
    CR = 'CR',
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

