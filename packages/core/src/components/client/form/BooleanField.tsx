import { AutoFormFieldProps } from '@autoform/react';
import { Checkbox } from '../../ui';

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  label,
}) => <Checkbox inputProps={inputProps}>{label}</Checkbox>;
