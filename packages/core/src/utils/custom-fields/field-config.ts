import { FieldConfig } from '@autoform/core';
import { SelectOption } from '../../types';
import {
  SuperRefineFunction,
  fieldConfig as zodBaseFieldConfig,
} from '@autoform/zod';
import { ReactNode } from 'react';
import { type FieldWrapperProps } from '@autoform/react';

export function buildZodFieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
>(
  config: FieldConfig<
    ReactNode,
    FieldTypes,
    React.ComponentType<FieldWrapperProps>,
    CustomData
  >
): SuperRefineFunction {
  return zodBaseFieldConfig<
    ReactNode,
    FieldTypes,
    React.ComponentType<FieldWrapperProps>,
    CustomData
  >(config);
}
