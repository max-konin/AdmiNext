import React from 'react';
import { AutoFormFieldProps } from '@autoform/react';
import { SelectOption } from '../../../types';
import { NativeSelectField, NativeSelectRoot } from '../../ui/native-select';
import { useColorModeValue } from '../../ui';
import { ClientOnly } from '@chakra-ui/react';

export const BelongsToField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
}) => {
  const options =
    (field.fieldConfig?.customData?.options as SelectOption[]) || [];

  const bgColor = useColorModeValue('white', 'gray.950');

  return (
    <ClientOnly>
      <NativeSelectRoot>
        <NativeSelectField {...inputProps} backgroundColor={bgColor}>
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
    </ClientOnly>
  );
};
