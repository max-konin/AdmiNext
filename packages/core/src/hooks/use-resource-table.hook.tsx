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
import { ListFieldDef, Resource } from '../types';
import { ActionsDropDown } from '../components/client/table/ActionsDropDown';
import {
  filterFunctionMap,
  numberFilter,
  objectFilter,
  textFilter,
} from '../utils/filters';

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
      list: { fields },
    },
  },
  data,
}: UseResourceTableArgs<TPK, TListFields, TListData>) => {
  const columns = useMemo<ColumnDef<TListData, any>[]>(
    () =>
      (Object.entries(fields) as [TListFields, ListFieldDef<TListFields>][])
        .map(([key, { label, render, filterType }]) => ({
          accessorKey: key,
          header: label,
          cell: (info: CellContext<TListData, any>) => {
            const value = info.getValue();
            return render ? render(value) : value;
          },
          meta: { filterType },
          filterFn: filterType ? filterFunctionMap[filterType] : undefined,
        }))
        .concat([
          {
            accessorKey: 'actions' as unknown as TListFields,
            header: '',
            cell: (info: CellContext<TListData, any>) => {
              return (
                <ActionsDropDown
                  resource={resource}
                  routePrefix={routePrefix}
                  resourceId={info.row.getValue(identityBy as string)}
                />
              );
            },
            meta: { filterType: undefined },
            filterFn: undefined,
          },
        ]),
    [fields]
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      number: numberFilter,
      object: objectFilter,
      text: textFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: true,
    debugColumns: false,
  });

  return { table };
};
