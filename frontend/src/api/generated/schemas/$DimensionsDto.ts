/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DimensionsDto = {
  properties: {
    thickness: {
      type: 'number',
      description: `The thickness of the material`,
      isRequired: true,
    },
    width: {
      type: 'number',
      description: `The width of the material`,
      isRequired: true,
    },
    length: {
      type: 'number',
      description: `The length of the material`,
      maximum: 100,
    },
  },
} as const;
