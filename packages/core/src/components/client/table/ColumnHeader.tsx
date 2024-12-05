import {
  Box,
  HStack,
  MenuContent,
  MenuRoot,
  MenuTrigger,
  Table,
} from '@chakra-ui/react';
import { flexRender, Header } from '@tanstack/react-table';
import { LuArrowBigDown, LuArrowBigUp } from 'react-icons/lu';
import { Filter } from './Filter';
import { MdOutlineFilterList } from 'react-icons/md';

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
        <Box display="flex">
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
          <Box>
            {header.column.getCanFilter() && filterable ? (
              <Box position="relative">
                <MenuRoot>
                  <MenuTrigger cursor="pointer" padding="5px">
                    <MdOutlineFilterList />
                  </MenuTrigger>
                  <MenuContent position="absolute">
                    <Box onClick={(e) => e.stopPropagation()}>
                      <Filter column={header.column} />
                    </Box>
                  </MenuContent>
                </MenuRoot>
              </Box>
            ) : null}
          </Box>
        </Box>
      )}
    </Table.ColumnHeader>
  );
};
