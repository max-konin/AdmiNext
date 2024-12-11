import { Row } from '@tanstack/react-table';

export const filterByType = <
  TListFields extends string,
  TListData extends { [k in TListFields]: unknown },
>(type: string, fieldName?: string) => {
  return type === 'object'
    ? (obj: Row<TListData>, field: TListFields, search: string) => {
      if (!fieldName) {
        return false;
      }
      const value = obj.getValue(field) as { [key: string]: any };
      return value[fieldName!].includes(search);
    }
    : 'includesString' as any;
}

