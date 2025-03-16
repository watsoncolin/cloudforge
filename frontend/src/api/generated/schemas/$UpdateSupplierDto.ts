/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateSupplierDto = {
  properties: {
    name: {
      type: 'string',
      description: `The name of the supplier company`,
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
      isRequired: true,
    },
    address: {
      type: 'string',
      description: `The street address of the supplier`,
      isRequired: true,
    },
    city: {
      type: 'string',
      description: `The city where the supplier is located`,
      isRequired: true,
    },
    stateProvince: {
      type: 'string',
      description: `The state or province where the supplier is located`,
      isRequired: true,
    },
    postalCode: {
      type: 'string',
      description: `The postal/ZIP code of the supplier`,
      isRequired: true,
    },
    country: {
      type: 'string',
      description: `The country where the supplier is located`,
      isRequired: true,
    },
    paymentTerm: {
      type: 'Enum',
      isRequired: true,
    },
  },
} as const;
