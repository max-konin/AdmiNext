import { FilterFn } from '@tanstack/react-table';

export const numberFilter: FilterFn<any> = (row, columnId, value) => {
  const cellValue = row.getValue(columnId);
  console.log('cellValNum', cellValue)
  return cellValue != null
    ? cellValue.toString().includes(value.toString())
    : false;
};

export const objectFilter: FilterFn<any> = (row, columnId, value) => {
  const cellValue = row.getValue(columnId);
  console.log('cellValObj', cellValue)
  return cellValue != null
    ? JSON.stringify(cellValue).toLowerCase().includes(value.toLowerCase())
    : false;
};

export const textFilter: FilterFn<any> = (row, columnId, value) => {
  const cellValue = row.getValue(columnId);
  console.log('cellValText', cellValue)
  return cellValue != null
    ? cellValue.toString().toLowerCase().includes(value.toLowerCase())
    : false;
};

export const filterFunctionMap = {
  number: numberFilter,
  object: objectFilter,
  text: textFilter,
};