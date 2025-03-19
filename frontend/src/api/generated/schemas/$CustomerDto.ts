/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CustomerDto = {
  properties: {
    id: {
      type: 'string',
      description: `The unique identifier of the customer`,
      isRequired: true,
    },
    readableId: {
      type: 'string',
      description: `The readable identifier of the customer`,
      isRequired: true,
    },
    name: {
      type: 'string',
      description: `The name of the customer company`,
      isRequired: true,
    },
    contact: {
      type: 'all-of',
      description: `The contact information of the customer`,
      contains: [{
        type: 'ContactDto',
      }],
      isRequired: true,
    },
    address: {
      type: 'all-of',
      description: `The address of the customer`,
      contains: [{
        type: 'AddressDto',
      }],
      isRequired: true,
    },
    paymentTerm: {
      type: 'string',
      description: `The payment terms for the customer`,
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      description: `The creation date of the customer`,
      isRequired: true,
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      description: `The update date of the customer`,
      isRequired: true,
      format: 'date-time',
    },
  },
} as const;
