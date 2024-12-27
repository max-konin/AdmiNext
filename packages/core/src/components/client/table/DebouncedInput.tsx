import { Input, HStack, Group, InputAddon } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

type DebouncedInputProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  const clearInput = () => {
    setValue('');
    onChange('');
  };

  return (
    <HStack gap="10" width="full">
      <Group flex="1">
        <InputAddon
          onClick={clearInput}
          style={{
            cursor: 'pointer',
            padding: '0',
          }}
        >
          <IoClose />
        </InputAddon>
        <Input
          {...props}
          size={typeof props.size === 'number' ? undefined : props.size}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          width="unset"
          height="auto"
        />
      </Group>
    </HStack>
  );
};
