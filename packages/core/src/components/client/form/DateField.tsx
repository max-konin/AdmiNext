import { AutoFormFieldProps } from '@autoform/react';
import { Input } from '@chakra-ui/react';

export const DateField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  label,
}) => {
  const { key, ...rest } = inputProps;
  return (
    <Input
      type="date"
      label={label}
      description={field.description}
      key={key}
      {...rest}
    />
  );
};
