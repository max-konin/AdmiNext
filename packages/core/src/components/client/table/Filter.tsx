import { Column } from '@tanstack/react-table';
import { DebouncedInput } from '../DebouncedInput';
import { InputGroup } from '../../ui/input-group';
import { LuX } from 'react-icons/lu';

type filterProps<TListData> = {
  column: Column<TListData, unknown>;
};

export function Filter<TListData>({ column }: filterProps<TListData>) {
  const columnFilterValue = column.getFilterValue();

  return (
    <InputGroup
      endElement={
        <LuX cursor="pointer" onClick={() => column.setFilterValue('')} />
      }
    >
      <DebouncedInput
        width="full"
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search...`}
        type="text"
        value={(columnFilterValue ?? '') as string}
      />
    </InputGroup>
  );
}
