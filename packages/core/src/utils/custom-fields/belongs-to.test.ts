import { describe, it, expect, vi, beforeEach } from 'vitest';
import { belongsTo } from './belongs-to';
import * as fieldConfigModule from './field-config';

describe('belongsTo', () => {
  const fieldConfigSpy = vi.spyOn(fieldConfigModule, 'buildZodFieldConfig');

  beforeEach(() => {
    fieldConfigSpy.mockClear();
  });

  it('should generate field config with options as strings', () => {
    const options = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
    ];
    const label = 'name';
    const value = 'id';

    belongsTo(options, label, value);

    expect(fieldConfigSpy).toHaveBeenCalledWith({
      fieldType: 'belongsTo',
      customData: {
        options: [
          ['1', 'Option 1'],
          ['2', 'Option 2'],
        ],
      },
    });
  });

  it('should generate field config with options using functions', () => {
    const options = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
    ];
    const label = (option: { name: string }) => option.name.toUpperCase();
    const value = (option: { id: number }) => `ID-${option.id}`;

    belongsTo(options, label, value);

    expect(fieldConfigSpy).toHaveBeenCalledWith({
      fieldType: 'belongsTo',
      customData: {
        options: [
          ['ID-1', 'OPTION 1'],
          ['ID-2', 'OPTION 2'],
        ],
      },
    });
  });

  it('should handle empty options array', () => {
    const options: { id: number; name: string }[] = [];
    const label = 'name';
    const value = 'id';

    belongsTo(options, label, value);

    expect(fieldConfigSpy).toHaveBeenCalledWith({
      fieldType: 'belongsTo',
      customData: {
        options: [],
      },
    });
  });
});
