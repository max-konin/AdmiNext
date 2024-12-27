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
  const { key, value, ...rest } = inputProps;

  return (
    <ClientOnly>
      <NativeSelectRoot>
        <NativeSelectField key={key} {...rest} backgroundColor={bgColor}>
          <option value={value} disabled>
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
