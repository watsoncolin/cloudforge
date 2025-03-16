/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PurchaseOrderDto = {
  properties: {
    id: {
      type: 'string',
      description: `The unique identifier of the purchase order`,
      isRequired: true,
    },
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
        type: 'PurchaseOrderItemDto',
      },
      isRequired: true,
    },
    totalPrice: {
      type: 'number',
      description: `The total price of the purchase order`,
      isRequired: true,
    },
    currency: {
      type: 'string',
      description: `The currency of the purchase order`,
      isRequired: true,
    },
    expectedDeliveryDate: {
      type: 'string',
      description: `The expected delivery date`,
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      description: `The created at date`,
      isRequired: true,
    },
    updatedAt: {
      type: 'string',
      description: `The updated at date`,
      isRequired: true,
    },
  },
} as const;
