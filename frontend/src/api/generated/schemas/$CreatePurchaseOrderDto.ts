/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreatePurchaseOrderDto = {
  properties: {
    supplierId: {
      type: 'string',
      description: `The supplier id`,
      isRequired: true,
    },
    orderDate: {
      type: 'string',
      description: `The order date`,
      isRequired: true,
    },
    status: {
      type: 'string',
      description: `The status of the purchase order`,
      isRequired: true,
    },
    items: {
      type: 'array',
      contains: {
        type: 'string',
      },
      isRequired: true,
    },
    expectedDeliveryDate: {
      type: 'string',
      description: `The expected delivery date`,
      isRequired: true,
      format: 'date-time',
    },
    currency: {
      type: 'string',
      description: `The currency of the purchase order`,
      isRequired: true,
    },
  },
} as const;
