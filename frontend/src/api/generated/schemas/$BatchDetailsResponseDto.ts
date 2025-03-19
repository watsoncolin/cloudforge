/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BatchDetailsResponseDto = {
  properties: {
    id: {
      type: 'string',
      description: `The ID of the batch`,
      isRequired: true,
    },
    inventory: {
      type: 'all-of',
      description: `The inventory`,
      contains: [{
        type: 'InventoryDto',
      }],
      isRequired: true,
    },
    batch: {
      type: 'all-of',
      description: `The batch`,
      contains: [{
        type: 'BatchDto',
      }],
      isRequired: true,
    },
  },
} as const;
