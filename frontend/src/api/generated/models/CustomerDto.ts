/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressDto } from './AddressDto';
import type { ContactDto } from './ContactDto';
export type CustomerDto = {
  /**
   * The unique identifier of the customer
   */
  id: string;
  /**
   * The name of the customer company
   */
  name: string;
  /**
   * The contact information of the customer
   */
  contact: ContactDto;
  /**
   * The address of the customer
   */
  address: AddressDto;
  /**
   * The payment terms for the customer
   */
  paymentTerm: string;
  /**
   * The creation date of the customer
   */
  createdAt: string;
  /**
   * The update date of the customer
   */
  updatedAt: string;
};

