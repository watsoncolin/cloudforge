/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OrderItemDto = {
  properties: {
    id: {
      type: 'string',
      description: `The ID of the order item`,
      isRequired: true,
    },
    inventoryId: {
      type: 'string',
      description: `The ID of the inventory that the order item is for`,
      isRequired: true,
    },
    inventory: {
      type: 'all-of',
      description: `The inventory that the order item is for`,
      contains: [{
        type: 'InventoryDto',
      }],
      isRequired: true,
    },
    batchIds: {
      type: 'array',
      contains: {
        type: 'string',
      },
      isRequired: true,
    },
    quantity: {
      type: 'number',
      description: `The quantity of the order item`,
      isRequired: true,
    },
    unitOfMeasure: {
      type: 'string',
      description: `The unit of measure of the order item`,
      isRequired: true,
    },
    price: {
      type: 'number',
      description: `The price of the order item`,
      isRequired: true,
    },
    total: {
      type: 'number',
      description: `The total price of the order item`,
      isRequired: true,
    },
    batches: {
      type: 'array',
      contains: {
        type: 'BatchDto',
      },
      isRequired: true,
    },
  },
} as const;
