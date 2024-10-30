import {
  AutoForm as BaseAutoForm,
  AutoFormUIComponents,
} from '@autoform/react';

import { Form } from './Form';
import { FieldWrapper } from './FieldWrapper';

import { SubmitButton } from './SubmitButton';
import { StringField } from './StringField';
import { NumberField } from './NumberField';
import { ErrorMessage } from './ErrorMessage';
import { AutoFormProps } from './types';
import { BooleanField } from './BooleanField';

const ChakraUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper: () => <>Not implemented</>,
  ArrayWrapper: () => <>Not implemented</>,
  ArrayElementWrapper: () => <>Not implemented</>,
};

export const ChakraAutoFormFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: () => <>Not implemented</>,
  select: () => <>Not implemented</>,
} as const;
export type FieldTypes = keyof typeof ChakraAutoFormFieldComponents;

export function AutoForm<T extends Record<string, any>>({
  uiComponents,
  formComponents,
  ...props
}: AutoFormProps<T>) {
  const ThemedForm = () => (
    <BaseAutoForm
      {...props}
      uiComponents={{ ...ChakraUIComponents, ...uiComponents }}
      formComponents={{ ...ChakraAutoFormFieldComponents, ...formComponents }}
    />
  );

  return <ThemedForm />;
}
