import { buildZodFieldConfig } from './field-config';

type OptionValueGetter<
  TFields extends string,
  TOption extends Record<string, unknown>,
> = TFields | ((option: TOption) => string);

export const belongsTo = <
  TFields extends string,
  TOption extends Record<string, unknown>,
>(
  options: TOption[],
  label: OptionValueGetter<TFields, TOption>,
  value: OptionValueGetter<TFields, TOption>
) =>
  buildZodFieldConfig({
    fieldType: 'belongsTo',
    customData: {
      options: options.map((option) => [
        get(option, value),
        get(option, label),
      ]),
    },
  });

const get = <TFields extends string, TOption extends Record<string, unknown>>(
  option: TOption,
  field: OptionValueGetter<TFields, TOption>
) => {
  if (typeof field === 'function') {
    return field(option);
  }
  return String(option[field]);
};
