import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  useResourceTable,
  UseResourceTableArgs,
} from './use-resource-table.hook';
import { Resource } from '../types';

describe('useResourceTable', () => {
  type TPK = number;
  type TListFields = 'name' | 'age' | 'id';
  type TListData = { name: string; age: number; id: number };

  const data: TListData[] = [
    { name: 'John Doe', age: 30, id: 1 },
    { name: 'Jane Doe', age: 25, id: 2 },
  ];

  const resourceDef: Resource<
    TPK,
    TListFields,
    TListData,
    any,
    any,
    any,
    any,
    any
  > = {
    title: 'Users',
    identityBy: 'id',
    pages: {
      list: {
        loader: async () => ({ data }),
        columns: [
          { accessorKey: 'name', header: 'Name' },
          { accessorKey: 'age', header: 'Age' },
        ],
      },
    },
  };

  const args: UseResourceTableArgs<TPK, TListFields, TListData> = {
    routePrefix: '/users',
    resource: 'users',
    data,
    resourceDef,
  };

  it('should return a table instance', () => {
    const { result } = renderHook(() => useResourceTable(args));
    expect(result.current.table).toBeDefined();
  });

  it('should have the correct columns', () => {
    const { result } = renderHook(() => useResourceTable(args));
    const columns = result.current.table.getAllColumns();
    expect(columns).toHaveLength(3); // name, age, and actions column
    expect(columns[0]?.id).toBe('name');
    expect(columns[1]?.id).toBe('age');
    expect(columns[2]?.id).toBe('actions');
  });

  it('should render the correct cell values', () => {
    const { result } = renderHook(() => useResourceTable(args));
    const rows = result.current.table.getRowModel().rows;
    expect(rows).toHaveLength(2);
    expect(rows[0]?.getValue('name')).toBe('John Doe');
    expect(rows[0]?.getValue('age')).toBe(30);
    expect(rows[1]?.getValue('name')).toBe('Jane Doe');
    expect(rows[1]?.getValue('age')).toBe(25);
  });
});
