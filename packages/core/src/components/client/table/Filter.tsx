import { Column } from '@tanstack/react-table';
import { DebouncedInput } from './DebouncedInput';

type filterProps<TListData> = {
  column: Column<TListData, unknown>;
};

export function Filter<TListData>({ column }: filterProps<TListData>) {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  );
}
