/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DimensionsDto } from './DimensionsDto';
export type CreateRFQItemDto = {
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
  unitOfMeasure: CreateRFQItemDto.unitOfMeasure;
  /**
   * The item price
   */
  price: number;
  /**
   * The item total
   */
  total: number;
};
export namespace CreateRFQItemDto {
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

