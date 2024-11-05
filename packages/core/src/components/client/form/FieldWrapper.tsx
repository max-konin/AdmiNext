import React from 'react';
import { FieldWrapperProps } from '@autoform/react';
import { Field } from '../../ui';

const DISABLED_LABELS = ['object', 'array'];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  id,
  field,
}) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);

  return (
    <Field
      label={label}
      errorText={error}
      id={id}
      invalid={!!error}
      required={field.required}
      helperText={field.fieldConfig?.description}
      disabled={isDisabled}
    >
      {children}
    </Field>
  );
};
