import { CRUDPageName, PageDefinition, Resource } from './types';

export const removeServerFunctionsFromResourceDefinition = <
  TPK,
  TFields extends string,
  // eslint-disable-next-line no-unused-vars
  TData extends { [k in TFields]: unknown },
>(
  resourceDefinition: Resource<TPK, TFields, TData>
) => {
  const { pages, ...rest } = resourceDefinition;
  return {
    ...rest,
    pages: Object.entries(pages).reduce(
      (acc, [key, page]) => {
        // eslint-disable-next-line no-unused-vars
        const { loader, ...restPage } = page;
        return {
          ...acc,
          [key]: restPage,
        };
      },
      {} as Record<CRUDPageName, PageDefinition>
    ),
  };
};

export type ClientResourceDefinition = ReturnType<
  typeof removeServerFunctionsFromResourceDefinition
>;

export const resource = <
  TPK,
  TFields extends string,
  TData extends { [k in TFields]: unknown },
>(
  def: Resource<TPK, TFields, TData>
) => def;
