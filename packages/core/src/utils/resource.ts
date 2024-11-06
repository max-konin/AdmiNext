import { z } from 'zod';
import { Resource } from '../types';

export const resource = <
  TPK,
  TListFields extends string,
  TListData extends { [k in TListFields]: unknown },
  TEditFormSchema extends z.ZodSchema<any>,
  TNewFormSchema extends z.ZodSchema<any>,
  TNewRelatedData extends Record<string, unknown[]> | never,
  TEditFromRelatedData extends Record<string, unknown[]> | never,
  TEditFormLoaderData extends {
    data: z.infer<TEditFormSchema> | null | undefined;
    relate?: TEditFromRelatedData;
  },
>(
  resource: Resource<
    TPK,
    TListFields,
    TListData,
    TEditFormSchema,
    TNewFormSchema,
    TNewRelatedData,
    TEditFromRelatedData,
    TEditFormLoaderData
  >
) => resource;
