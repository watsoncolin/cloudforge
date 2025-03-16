/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PurchaseOrderItemDto = {
  properties: {
    id: {
      type: 'string',
      description: `The unique identifier of the purchase order item`,
      isRequired: true,
    },
    materialType: {
      type: 'Enum',
      isRequired: true,
    },
    grade: {
      type: 'string',
      description: `The grade of the material`,
      isRequired: true,
    },
    dimensions: {
      type: 'dictionary',
      contains: {
        properties: {
        },
      },
      isRequired: true,
    },
    quantity: {
      type: 'number',
      description: `The quantity of the material`,
      isRequired: true,
    },
    unitOfMeasure: {
      type: 'Enum',
      isRequired: true,
    },
    unitPrice: {
      type: 'number',
      description: `The unit price of the material`,
      isRequired: true,
    },
    totalPrice: {
      type: 'number',
      description: `The total price of the material`,
      isRequired: true,
    },
  },
} as const;
