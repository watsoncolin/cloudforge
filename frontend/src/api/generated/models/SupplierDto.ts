/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressDto } from './AddressDto';
import type { ContactDto } from './ContactDto';
export type SupplierDto = {
  /**
   * The unique identifier of the supplier
   */
  id: string;
  /**
   * The readable identifier of the supplier
   */
  readableId: string;
  /**
   * The name of the supplier company
   */
  name: string;
  /**
   * The contact information of the supplier
   */
  contact: ContactDto;
  /**
   * The address of the supplier
   */
  address: AddressDto;
  /**
   * The payment terms for the supplier
   */
  paymentTerm: string;
  /**
   * The materials the supplier can provide
   */
  materials: Array<string>;
  /**
   * The creation date of the supplier
   */
  createdAt: string;
  /**
   * The update date of the supplier
   */
  updatedAt: string;
};

