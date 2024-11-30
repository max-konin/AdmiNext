import { ClientOnly } from '@chakra-ui/react';
import { Column } from '@tanstack/react-table';
import { useState, useEffect } from 'react';

type filterProps<TListData> = {
  column: Column<TListData, unknown>;
};

export function Filter<TListData>({ column }: filterProps<TListData>) {
  const columnFilterValue = column.getFilterValue();

  return (
    <ClientOnly>
      <DebouncedInput
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search...`}
        type="text"
        value={(columnFilterValue ?? '') as string}
        style={{ width: '80px' }}
      />
    </ClientOnly>
  );
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
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

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
