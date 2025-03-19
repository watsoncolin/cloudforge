/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateBatchLocationDto = {
  properties: {
    warehouse: {
      type: 'string',
      description: `The warehouse of the batch`,
      isRequired: true,
    },
    zone: {
      type: 'string',
      description: `The zone of the batch`,
      isRequired: true,
    },
    bin: {
      type: 'string',
      description: `The bin of the batch`,
      isRequired: true,
    },
  },
} as const;
