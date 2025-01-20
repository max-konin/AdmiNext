import { AutoFormFieldProps } from '@autoform/react';
import { Checkbox } from '../../ui';

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  label,
}) => {
  const { key, ...rest } = inputProps;
  return (
    <Checkbox key={key} inputProps={rest}>
      {label}
    </Checkbox>
  );
};
