/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateRFQItemDto = {
  properties: {
    id: {
      type: 'string',
      description: `The item ID`,
      isRequired: true,
    },
    materialType: {
      type: 'Enum',
      isRequired: true,
    },
    processingType: {
      type: 'Enum',
      isRequired: true,
    },
    grade: {
      type: 'string',
      description: `The item grade`,
      isRequired: true,
    },
    dimensions: {
      type: 'all-of',
      description: `The item dimensions`,
      contains: [{
        type: 'DimensionsDto',
      }],
      isRequired: true,
    },
    quantity: {
      type: 'number',
      description: `The item quantity`,
      isRequired: true,
    },
    unitOfMeasure: {
      type: 'Enum',
      isRequired: true,
    },
    price: {
      type: 'number',
      description: `The item price`,
      isRequired: true,
    },
    total: {
      type: 'number',
      description: `The item total`,
      isRequired: true,
    },
  },
} as const;
