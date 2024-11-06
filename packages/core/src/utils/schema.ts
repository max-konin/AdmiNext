import { z } from 'zod';

export const getSchema = <TFormSchema extends z.ZodSchema<any>, TLoaderData>(
  schema: TFormSchema | ((loaderData: TLoaderData) => TFormSchema),
  loaderData: TLoaderData
): TFormSchema => {
  if (typeof schema === 'function') {
    return schema(loaderData);
  }
  return schema;
};
