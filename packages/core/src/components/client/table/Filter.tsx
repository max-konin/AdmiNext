import { Column } from '@tanstack/react-table';
import { DebouncedInput } from '../DebouncedInput';
import { InputGroup } from '../../ui/input-group';
import { CloseIcon } from '../../icons/CloseIcon';
import { Box } from '@chakra-ui/react';

type filterProps<TListData> = {
  column: Column<TListData, unknown>;
};

export function Filter<TListData>({ column }: filterProps<TListData>) {
  const columnFilterValue = column.getFilterValue();

  return (
    <InputGroup
      endElement={
        <Box cursor="pointer" onClick={() => column.setFilterValue('')}>
          <CloseIcon />
        </Box>
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
