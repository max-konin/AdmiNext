import { ReactNode } from 'react';
import z from 'zod';

export const CRUDPages = {
  list: 'list',
  edit: 'edit',
  new: 'new',
} as const;

export type CRUDPageName = (typeof CRUDPages)[keyof typeof CRUDPages];

export type TFormPage<
  TFormSchema extends z.ZodSchema<any>,
  TOtherData extends Record<string, unknown> = {},
> = {
  schema?: TFormSchema;
  fields: {
    [k in z.infer<TFormSchema>]?: {
      label: string;
      render?: (value: z.infer<TFormSchema>[k]) => ReactNode;
    };
  };
  actions: {
    submit: (
      formData: { data: z.infer<TFormSchema> } & TOtherData
    ) => Promise<void>;
  };
};

export type Resource<
  TPK,
  TListFields extends string,
  TListData extends { [k in TListFields]: unknown },
  TEditFormSchema extends z.ZodSchema<any>,
  TNewFormSchema extends z.ZodSchema<any>,
  TNewRelatedData extends Record<string, unknown[]> | never,
  TEditFromRelatedData extends Record<string, unknown[]> | never,
  TEditFormLoaderData extends {
    data: z.infer<TEditFormSchema> | null | undefined;
    related?: TEditFromRelatedData;
  },
> = {
  identityBy: keyof TListData;
  title: string;
  menuLabel?: string;
  group?: string;
  toString?: (data: TListData) => string;
  pages: {
    new?: TFormPage<TNewFormSchema> & {
      loader?: () => Promise<{ related: TNewRelatedData }>;
    };
    edit?: TFormPage<TEditFormSchema, { id: TPK }> & {
      loader: (id: TPK) => Promise<TEditFormLoaderData>;
    };
    list: {
      loader: () => Promise<{ data: TListData[] }>;
      fields: {
        [k in TListFields]: {
          label: string;
          render?: (value: TListData[k]) => ReactNode;
        };
      };
      actions?: {};
    };
  };
};

export type Resources = Record<
  string,
  Resource<any, any, any, any, any, any, any, any>
>;

export type PageDefinition<TPage extends CRUDPageName> = Resource<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>['pages'][TPage];

export type RouteProps = {
  params: { resource?: string[] };
  searchParams: Record<string, unknown>;
};

export type DashboardPage = { resource: 'dashboard' };
export type ResourcePage = {
  resource: string;
  loaderData: any;
  view: CRUDPageName;
};

export type DataProviderChildrenProps = DashboardPage | ResourcePage;

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
    related: TEditFromRelatedData;
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
