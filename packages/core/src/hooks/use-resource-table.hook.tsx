import { useMemo } from 'react';

import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Resource } from '../types';
import { ActionsDropDown } from '../components/client/table/ActionsDropDown';
import { Flex } from '@chakra-ui/react';

export type UseResourceTableArgs<
  TPK,
  TListFields extends string,
  TListData extends { [k in TListFields]: unknown },
> = {
  routePrefix: string;
  resource: string;
  data: TListData[];
  resourceDef: Resource<TPK, TListFields, TListData, any, any, any, any, any>;
};

export const useResourceTable = <
  TPK,
  TListFields extends string,
  TListData extends { [k in TListFields]: unknown },
>({
  resource,
  routePrefix,
  resourceDef: {
    identityBy,
    pages: {
      list: { columns, actions },
    },
  },
  data,
}: UseResourceTableArgs<TPK, TListFields, TListData>) => {
  const withActionsColumns = [
    ...columns,
    {
      accessorKey: 'id' as TListFields,
      header: '',
      enableColumnFilter: false,
      cell: (info: CellContext<TListData, any>) => {
        return (
          <Flex justifyContent="flex-end">
            <ActionsDropDown
              resource={resource}
              routePrefix={routePrefix}
              resourceId={info.row.getValue(identityBy as string)}
              deleteItem={actions?.delete}
            />
          </Flex>
        );
      },
      meta: { filter: undefined },
      filterFn: undefined,
    },
  ];

  const table = useReactTable({
    data,
    columns: withActionsColumns,
    filterFns: {},
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: true,
    debugColumns: false,
  });

  return {
    table,

    pagination: {
      ...table.getState().pagination,
      count: table.getFilteredRowModel().rows.length,

      changePage: table.setPageIndex,
      changePageSize: table.setPageSize,
    },
  };
};
