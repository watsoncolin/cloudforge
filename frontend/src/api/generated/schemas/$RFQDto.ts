/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RFQDto = {
  properties: {
    id: {
      type: 'string',
      description: `The RFQ ID`,
      isRequired: true,
    },
    readableId: {
      type: 'string',
      description: `The readable ID`,
      isRequired: true,
    },
    customerId: {
      type: 'string',
      description: `The customer ID`,
      isRequired: true,
    },
    customer: {
      type: 'all-of',
      description: `The customer dto`,
      contains: [{
        type: 'CustomerDto',
      }],
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
        type: 'RFQItemDto',
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
    createdAt: {
      type: 'string',
      description: `The RFQ created at`,
      isRequired: true,
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      description: `The RFQ updated at`,
      isRequired: true,
      format: 'date-time',
    },
  },
} as const;
