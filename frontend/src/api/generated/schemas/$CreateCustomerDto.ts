/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateCustomerDto = {
  properties: {
    name: {
      type: 'string',
      description: `The name of the customer company`,
      isRequired: true,
    },
    contactName: {
      type: 'string',
      description: `The name of the primary contact person`,
      isRequired: true,
    },
    contactEmail: {
      type: 'string',
      description: `The email address of the primary contact`,
      isRequired: true,
    },
    contactPhone: {
      type: 'string',
      description: `The phone number of the primary contact`,
    },
    address: {
      type: 'string',
      description: `The street address of the customer`,
      isRequired: true,
    },
    city: {
      type: 'string',
      description: `The city where the customer is located`,
      isRequired: true,
    },
    country: {
      type: 'string',
      description: `The country where the customer is located`,
      isRequired: true,
    },
    stateProvince: {
      type: 'string',
      description: `The state or province where the customer is located`,
      isRequired: true,
    },
    postalCode: {
      type: 'string',
      description: `The postal/ZIP code of the customer`,
      isRequired: true,
    },
    paymentTerm: {
      type: 'Enum',
      isRequired: true,
    },
  },
} as const;
