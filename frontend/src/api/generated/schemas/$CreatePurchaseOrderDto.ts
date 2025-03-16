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
      type: 'Enum',
      isRequired: true,
    },
    items: {
      type: 'array',
      contains: {
        type: 'PurchaseOrderItemDto',
      },
      isRequired: true,
    },
    expectedDeliveryDate: {
      type: 'string',
      description: `The expected delivery date. Format: YYYY-MM-DD`,
      isRequired: true,
    },
    currency: {
      type: 'string',
      description: `The currency of the purchase order`,
      isRequired: true,
    },
  },
} as const;
