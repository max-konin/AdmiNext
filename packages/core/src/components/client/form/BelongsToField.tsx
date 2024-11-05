import React from 'react';
import { AutoFormFieldProps } from '@autoform/react';
import { SelectOption } from '../../../types';
import { NativeSelectField, NativeSelectRoot } from '../../ui/native-select';

export const BelongsToField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
}) => {
  const options =
    (field.fieldConfig?.customData?.options as SelectOption[]) || [];

  return (
    <NativeSelectRoot>
      <NativeSelectField {...inputProps}>
        <option value="" disabled selected>
          Select...
        </option>
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </NativeSelectField>
    </NativeSelectRoot>
  );
};
