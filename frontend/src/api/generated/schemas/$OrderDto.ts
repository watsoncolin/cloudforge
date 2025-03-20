/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OrderDto = {
  properties: {
    id: {
      type: 'string',
      description: `The ID of the order`,
      isRequired: true,
    },
    readableId: {
      type: 'string',
      description: `The readable ID of the order`,
      isRequired: true,
    },
    quoteId: {
      type: 'string',
      description: `The ID of the quote that the order is based on`,
      isRequired: true,
    },
    status: {
      type: 'Enum',
      isRequired: true,
    },
    customerId: {
      type: 'string',
      description: `The ID of the customer that the order is for`,
      isRequired: true,
    },
    customerName: {
      type: 'string',
      description: `The name of the customer that the order is for`,
      isRequired: true,
    },
    items: {
      type: 'array',
      contains: {
        type: 'OrderItemDto',
      },
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      description: `The date and time the order was created`,
      isRequired: true,
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      description: `The date and time the order was updated`,
      isRequired: true,
      format: 'date-time',
    },
  },
} as const;
