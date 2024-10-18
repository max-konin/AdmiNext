/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';

type PKField = string;
type PKValue = string | number;

export type Entity<TPKField extends PKField, TPKValue extends PKValue> = {
  [key in TPKField]: TPKValue;
};

export type ResourceRepo<
  TPKField extends PKField,
  TPKValue extends PKValue,
  TGetByIdReturnType extends Entity<TPKField, TPKValue>,
  TFindAllReturnType extends Entity<TPKField, TPKValue>,
> = {
  pk: TPKField;
  getById: (id: TPKValue) => Promise<TGetByIdReturnType | null>;
  findAll: () => Promise<TFindAllReturnType[]>;
};

export type SingleEntityPage<
  TPK,
  TFields extends string,
  TData extends { [k in TFields]: unknown },
> = {
  loader: (id: TPK) => Promise<TData | null | undefined>;
  fields: {
    [k in TFields]: {
      label: string;
      render?: (value: TData[k]) => ReactNode;
    };
  };
};

export type ListEntitiesPage<
  TPK,
  TFields extends string,
  TData extends { [k in TFields]: unknown },
> = {
  loader: (id: TPK) => Promise<TData[]>;
  fields: {
    [k in TFields]: {
      label: string;
      render?: (value: TData[k]) => ReactNode;
    };
  };
};

export const CRUDPages = {
  list: 'list',
  show: 'show',
} as const;

export type CRUDPageName = (typeof CRUDPages)[keyof typeof CRUDPages];

export type PageDefinition = {
  fields: Record<
    string,
    { label: string; render?: (value: unknown) => ReactNode }
  >;
};

export type Resource<
  TPK,
  TFields extends string,
  TData extends { [k in TFields]: unknown },
> = {
  identityBy: TPK;
  title: string;
  menuLabel?: string;
  group?: string;
  pages: {
    show: SingleEntityPage<TPK, TFields, TData>;
    list: ListEntitiesPage<TPK, TFields, TData>;
  };
};

export type RouteProps = {
  params: { resource: string[] };
  searchParams: Record<string, unknown>;
};
