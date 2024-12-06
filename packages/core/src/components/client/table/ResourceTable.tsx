import { For, Table } from '@chakra-ui/react';
import { useResourceTable, UseResourceTableArgs } from '../../../hooks';
import { ColumnHeader } from './ColumnHeader';
import { flexRender } from '@tanstack/react-table';

type ResourceTableProps<
  TPK,
  TListFields extends string,
  TListData extends { [k in TListFields]: unknown },
> = UseResourceTableArgs<TPK, TListFields, TListData>;

export const ResourceTable = <
  TPK,
  TListFields extends string,
  TListData extends { [k in TListFields]: unknown },
>(
  props: ResourceTableProps<TPK, TListFields, TListData>
) => {
  const { table } = useResourceTable(props);
  return (
    <Table.Root>
      <Table.Header>
        <For each={table.getCenterHeaderGroups()}>
          {(headerGroup) => (
            <Table.Row key={headerGroup.id}>
              <For each={headerGroup.headers}>
                {(header) => (
                  <ColumnHeader
                    key={header.id}
                    header={header}
                    filter={(header.column.columnDef.meta as any)?.filterType}
                  />
                )}
              </For>
            </Table.Row>
          )}
        </For>
      </Table.Header>
      <Table.Body>
        <For each={table.getRowModel().rows}>
          {(row) => (
            <Table.Row key={row.id} data-testid="resource-table-row">
              <For each={row.getVisibleCells()}>
                {(cell) => (
                  <Table.Cell
                    key={cell.id}
                    data-testid={`resource-table-cell__${cell.id}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                )}
              </For>
            </Table.Row>
          )}
        </For>
      </Table.Body>
    </Table.Root>
  );
};
