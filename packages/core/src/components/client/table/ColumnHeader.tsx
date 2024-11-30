import { Box, HStack, Table } from '@chakra-ui/react';
import { flexRender, Header } from '@tanstack/react-table';
import { LuArrowBigDown, LuArrowBigUp } from 'react-icons/lu';
import { Filter } from './Filter';

type ColumnHeaderProps<TListData> = {
  header: Header<TListData, unknown>;
  filterable?: boolean;
};

export const ColumnHeader = <TListData,>({
  header,
  filterable,
}: ColumnHeaderProps<TListData>) => {
  return (
    <Table.ColumnHeader colSpan={header.colSpan}>
      {header.isPlaceholder ? null : (
        <Box height="40px">
          <Box
            onClick={header.column.getToggleSortingHandler()}
            cursor={header.column.getCanSort() ? 'pointer' : 'default'}
            unselectable="on"
            data-testid="resource-table-header"
          >
            <HStack gap={1}>
              {flexRender(header.column.columnDef.header, header.getContext())}
              {{
                asc: <LuArrowBigUp />,
                desc: <LuArrowBigDown />,
              }[header.column.getIsSorted() as string] ?? null}
            </HStack>
          </Box>
          <Box width="10px">
            {header.column.getCanFilter() && filterable ? (
              <Filter column={header.column}></Filter>
            ) : null}
          </Box>
        </Box>
      )}
    </Table.ColumnHeader>
  );
};
