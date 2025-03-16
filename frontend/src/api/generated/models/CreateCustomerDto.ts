/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateCustomerDto = {
  /**
   * The name of the customer company
   */
  name: string;
  /**
   * The name of the primary contact person
   */
  contactName: string;
  /**
   * The email address of the primary contact
   */
  contactEmail: string;
  /**
   * The phone number of the primary contact
   */
  contactPhone?: string;
  /**
   * The street address of the customer
   */
  address: string;
  /**
   * The city where the customer is located
   */
  city: string;
  /**
   * The country where the customer is located
   */
  country: string;
  /**
   * The state or province where the customer is located
   */
  stateProvince: string;
  /**
   * The postal/ZIP code of the customer
   */
  postalCode: string;
  /**
   * The payment terms for the customer
   */
  paymentTerm: CreateCustomerDto.paymentTerm;
};
export namespace CreateCustomerDto {
  /**
   * The payment terms for the customer
   */
  export enum paymentTerm {
    NET_30 = 'NET_30',
    NET_60 = 'NET_60',
    NET_90 = 'NET_90',
    IMMEDIATE = 'IMMEDIATE',
  }
}

