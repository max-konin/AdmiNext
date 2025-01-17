import { TableOptionsResolved } from '@tanstack/react-table';
import { ReactNode } from 'react';
import z from 'zod';
import { convertFileToSerializableObject } from './utils';
import { FileUploadRootProps } from './components/ui/file-upload';

export const CRUDPages = {
  list: 'list',
  edit: 'edit',
  new: 'new',
} as const;

export type CRUDPageName = (typeof CRUDPages)[keyof typeof CRUDPages];

export type TFormPage<
  TFormSchema extends z.ZodSchema<any>,
  TLoaderFn extends ((...args: any[]) => Promise<any>) | undefined = undefined,
  TOtherData extends Record<string, unknown> = {},
> = {
  schema:
    | TFormSchema
    | ((
        loaderData: TLoaderFn extends (...args: any[]) => Promise<any>
          ? Awaited<ReturnType<TLoaderFn>>
          : never
      ) => TFormSchema);
  loader: TLoaderFn;
  fields?: {
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
  toName?: (data: TListData) => string;
  pages: {
    new?: TFormPage<
      TNewFormSchema,
      (() => Promise<{ related: TNewRelatedData }>) | undefined
    >;
    edit?: TFormPage<
      TEditFormSchema,
      (id: string) => Promise<TEditFormLoaderData>,
      { id: TPK }
    >;
    list: {
      loader: () => Promise<{ data: TListData[] }>;
      columns: TableOptionsResolved<TListData>['columns'];
      actions?: {
        delete?: (id: string) => Promise<void>;
      };
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
  params: Promise<{ resource?: string[] }>;
  searchParams: Promise<Record<string, unknown>>;
};

export type DashboardPage = { resource: 'dashboard' };
export type ResourcePage = {
  resource: string;
  loaderData: any;
  view: CRUDPageName;
};

export type DataProviderChildrenProps = DashboardPage | ResourcePage;

export type SelectOption = [string, string];

export type AdmiNextContextType = {
  routePrefix: string;
  resourcesDefinition: Resources;
};

export type FilesFieldConfig = {
  maxFiles: number;
  label: string;
  description: string;
} & Pick<FileUploadRootProps, 'accept'>;

export type SidebarSlots = {
  slots?: {
    user?: () => ReactNode;
  };
};
