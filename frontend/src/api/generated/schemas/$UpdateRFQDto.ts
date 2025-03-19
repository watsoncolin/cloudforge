/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateRFQDto = {
  properties: {
    id: {
      type: 'string',
      description: `The RFQ ID`,
      isRequired: true,
    },
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
        type: 'UpdateRFQItemDto',
      },
      isRequired: true,
    },
    status: {
      type: 'Enum',
      isRequired: true,
    },
  },
} as const;
