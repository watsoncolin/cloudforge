/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateRFQDto = {
  properties: {
    customerId: {
      type: 'string',
      description: `The customer ID`,
      isRequired: true,
    },
    notes: {
      type: 'string',
      description: `The RFQ notes`,
      isRequired: true,
    },
    items: {
      type: 'array',
      contains: {
        type: 'CreateRFQItemDto',
      },
      isRequired: true,
    },
    status: {
      type: 'Enum',
      isRequired: true,
    },
    source: {
      type: 'Enum',
      isRequired: true,
    },
  },
} as const;
