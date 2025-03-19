/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InventoryDto = {
  properties: {
    id: {
      type: 'string',
      description: `The ID of the inventory`,
      isRequired: true,
    },
    materialType: {
      type: 'string',
      description: `The material type of the inventory`,
      isRequired: true,
    },
    grade: {
      type: 'string',
      description: `The grade of the inventory`,
      isRequired: true,
    },
    dimensions: {
      type: 'all-of',
      description: `The dimensions of the inventory`,
      contains: [{
        type: 'Dimensions',
      }],
      isRequired: true,
    },
    unitOfMeasure: {
      type: 'string',
      description: `The unit of measure of the inventory`,
      isRequired: true,
    },
    totalQuantity: {
      type: 'number',
      description: `The total quantity of the inventory on hand`,
      isRequired: true,
    },
    availableQuantity: {
      type: 'number',
      description: `The available quantity of the inventory to be used`,
      isRequired: true,
    },
    allocatedQuantity: {
      type: 'number',
      description: `The allocated quantity of the inventory to existing unshipped orders`,
      isRequired: true,
    },
    reorderStatus: {
      type: 'string',
      description: `The reorder status of the inventory`,
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
