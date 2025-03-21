/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SupplierDto = {
  properties: {
    id: {
      type: 'string',
      description: `The unique identifier of the supplier`,
      isRequired: true,
    },
    readableId: {
      type: 'string',
      description: `The readable identifier of the supplier`,
      isRequired: true,
    },
    name: {
      type: 'string',
      description: `The name of the supplier company`,
      isRequired: true,
    },
    contact: {
      type: 'all-of',
      description: `The contact information of the supplier`,
      contains: [{
        type: 'ContactDto',
      }],
      isRequired: true,
    },
    address: {
      type: 'all-of',
      description: `The address of the supplier`,
      contains: [{
        type: 'AddressDto',
      }],
      isRequired: true,
    },
    paymentTerm: {
      type: 'string',
      description: `The payment terms for the supplier`,
      isRequired: true,
    },
    materials: {
      type: 'array',
      contains: {
        type: 'string',
      },
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      description: `The creation date of the supplier`,
      isRequired: true,
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      description: `The update date of the supplier`,
      isRequired: true,
      format: 'date-time',
    },
  },
} as const;
