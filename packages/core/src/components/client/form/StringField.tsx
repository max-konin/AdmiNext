import { AutoFormFieldProps } from '@autoform/react';
import { Input } from '@chakra-ui/react';

export const StringField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  label,
}) => (
  <Input
    type="text"
    label={label}
    description={field.description}
    {...inputProps}
  />
);
