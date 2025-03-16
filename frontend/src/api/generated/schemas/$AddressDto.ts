/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AddressDto = {
  properties: {
    street: {
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
  },
} as const;
