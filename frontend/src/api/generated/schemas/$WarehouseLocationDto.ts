/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WarehouseLocationDto = {
  properties: {
    id: {
      type: 'string',
      description: `The unique identifier of the warehouse`,
      isRequired: true,
    },
    name: {
      type: 'string',
      description: `The name of the warehouse`,
      isRequired: true,
    },
    zone: {
      type: 'string',
      description: `The zone of the warehouse`,
      isRequired: true,
    },
    bin: {
      type: 'string',
      description: `The bin of the warehouse`,
      isRequired: true,
    },
  },
} as const;
