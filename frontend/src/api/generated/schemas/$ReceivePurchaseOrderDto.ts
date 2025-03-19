/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ReceivePurchaseOrderDto = {
  properties: {
    purchaseOrderItemId: {
      type: 'string',
      description: `The unique identifier of the purchase order line item from the purchase order`,
      isRequired: true,
    },
    batchNumber: {
      type: 'string',
      description: `The batch number from the supplier of the purchase order item`,
      isRequired: true,
    },
    warehouseLocation: {
      type: 'all-of',
      description: `The warehouse location`,
      contains: [{
        type: 'WarehouseLocationDto',
      }],
      isRequired: true,
    },
    heatNumber: {
      type: 'string',
      description: `The heat number of the purchase order item`,
      isRequired: true,
    },
    millCertUrl: {
      type: 'string',
      description: `The mill cert url of the purchase order item`,
      isRequired: true,
    },
  },
} as const;
