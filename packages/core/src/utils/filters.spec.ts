import { describe, it, expect } from 'vitest';
import { filterByType } from './filters';

class MockRow<TListData> {
  constructor(private data: TListData) { }

  getValue(columnId: keyof TListData) {
    return this.data[columnId];
  }

}

describe('filterByType', () => {
  it('should filter object by field name', () => {
    const row = new MockRow({ category: { name: 'Test Category' } });
    const filterFn = filterByType('object', 'name');
    const result = filterFn(row, 'category', 'Test');
    expect(result).toBe(true);
  });

  it('should return false if no search match', () => {
    const row = new MockRow({ category: { name: 'Test Category' } });
    const filterFn = filterByType('object', 'name');
    const result = filterFn(row, 'category', 'New');
    expect(result).toBe(false);
  });

  it('should return includesString for non-object types', () => {
    const filterFn = filterByType('text');
    expect(filterFn).toBe('includesString');
  });

  it('should return false if no fieldName', () => {
    const row = new MockRow({ category: { name: 'Test Category' } });
    const filterFn = filterByType('object');
    const result = filterFn(row, 'category');
    expect(result).toBe(false);
  });
});
