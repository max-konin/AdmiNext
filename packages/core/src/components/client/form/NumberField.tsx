import { AutoFormFieldProps } from '@autoform/react';
import { Input } from '@chakra-ui/react';

export const NumberField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  label,
}) => {
  const { key, ...rest } = inputProps;
  return (
    <Input
      type="number"
      label={label}
      description={field.description}
      {...inputProps}
      key={key}
      {...rest}
    />
  );
};
