import {
  Badge,
  Box,
  Flex,
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
};

export const ColumnHeader = <TListData,>({
  header,
}: ColumnHeaderProps<TListData>) => {
  return (
    <Table.ColumnHeader colSpan={header.colSpan}>
      {header.isPlaceholder ? null : (
        <Flex gap="2">
          <Box>
            {header.column.getCanFilter() && (
              <Box position="relative">
                <MenuRoot>
                  <MenuTrigger cursor="pointer" paddingRight="2px">
                    {header.column.getIsFiltered() ? (
                      <Badge colorPalette="accent">
                        <MdOutlineFilterList />
                      </Badge>
                    ) : (
                      <MdOutlineFilterList />
                    )}
                  </MenuTrigger>
                  <MenuContent position="absolute">
                    <Box
                      onClick={(e) => e.stopPropagation()}
                      p="2"
                      minW="200px"
                    >
                      <Filter column={header.column} />
                    </Box>
                  </MenuContent>
                </MenuRoot>
              </Box>
            )}
          </Box>
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
        </Flex>
      )}
    </Table.ColumnHeader>
  );
};
