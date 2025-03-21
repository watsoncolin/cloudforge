/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateSupplierDto = {
  /**
   * The name of the supplier company
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
  contactPhone: string;
  /**
   * The street address of the supplier
   */
  address: string;
  /**
   * The city where the supplier is located
   */
  city: string;
  /**
   * The state or province where the supplier is located
   */
  stateProvince: string;
  /**
   * The postal/ZIP code of the supplier
   */
  postalCode: string;
  /**
   * The country where the supplier is located
   */
  country: string;
  /**
   * The payment terms for the supplier
   */
  paymentTerm: UpdateSupplierDto.paymentTerm;
};
export namespace UpdateSupplierDto {
  /**
   * The payment terms for the supplier
   */
  export enum paymentTerm {
    NET_30 = 'NET_30',
    NET_60 = 'NET_60',
    NET_90 = 'NET_90',
    IMMEDIATE = 'IMMEDIATE',
  }
}

