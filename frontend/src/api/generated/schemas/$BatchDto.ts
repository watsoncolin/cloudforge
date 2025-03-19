/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BatchDto = {
  properties: {
    id: {
      type: 'string',
      description: `The ID of the batch`,
      isRequired: true,
    },
    supplierId: {
      type: 'string',
      description: `The supplier ID of the batch`,
      isRequired: true,
    },
    purchaseOrderId: {
      type: 'string',
      description: `The purchase order ID of the batch`,
      isRequired: true,
    },
    purchaseOrderItemId: {
      type: 'string',
      description: `The purchase order item ID of the batch`,
      isRequired: true,
    },
    location: {
      type: 'all-of',
      description: `The location of the batch`,
      contains: [{
        type: 'WarehouseLocation',
      }],
      isRequired: true,
    },
    batchNumber: {
      type: 'string',
      description: `The batch number of the batch`,
      isRequired: true,
    },
    heatNumber: {
      type: 'string',
      description: `The heat number of the batch`,
      isRequired: true,
    },
    millCertification: {
      type: 'string',
      description: `The mill certification of the batch`,
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      description: `The created at of the batch`,
      isRequired: true,
      format: 'date-time',
    },
    totalQuantity: {
      type: 'number',
      description: `The total quantity of the batch`,
      isRequired: true,
    },
    availableQuantity: {
      type: 'number',
      description: `The available quantity of the batch`,
      isRequired: true,
    },
    allocatedQuantity: {
      type: 'number',
      description: `The allocated quantity of the batch`,
      isRequired: true,
    },
  },
} as const;
