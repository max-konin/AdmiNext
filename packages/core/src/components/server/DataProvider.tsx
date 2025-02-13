import { ReactNode } from 'react';
import {
  CRUDPageName,
  CRUDPages,
  CustomPageDefinition,
  DataProviderChildrenProps,
  PageDefinition,
  Resources,
  RouteProps,
} from '../../types';
import { notFound } from 'next/navigation';

export type DataProviderProps = {
  resources: Resources;
  customPages?: CustomPageDefinition[];
  routeProps: RouteProps;
  children: (props: DataProviderChildrenProps) => ReactNode;
};

export const DataProvider = async ({
  resources,
  customPages,
  routeProps: { params },
  children,
}: DataProviderProps) => {
  const { resource: resourceParams } = await params;

  const customPage = findCustomPage(customPages, resourceParams);

  if (customPage) {
    return (
      <>
        {children({
          resource: 'custom-page',
          route: customPage.route,
        })}
      </>
    );
  }

  if (!resourceParams) {
    return (
      <>
        {children({
          resource: 'dashboard',
        })}
      </>
    );
  }

  const [currentResource, currentId] = resourceParams;

  const view = getView(currentId);
  const loaderData = await loadRouteData(
    currentResource!,
    view,
    resources,
    currentId
  );

  return (
    <>
      {children({
        resource: currentResource!,
        loaderData,
        view,
      })}
    </>
  );
};

const findCustomPage = (
  customPages?: CustomPageDefinition[],
  resourceParams?: string[]
) => {
  const path = resourceParams?.join('/');
  return customPages?.find(({ route }) => route === path);
};

const getView = (segment?: string) => {
  if (!segment) return CRUDPages.list;
  return segment === 'new' ? CRUDPages.new : CRUDPages.edit;
};

const loadRouteData = async (
  resource: string,
  view: CRUDPageName,
  resources: Resources,
  currentId?: string
) => {
  const pageDefinition = resources[resource]?.pages[view];

  if (!pageDefinition) return notFound();

  switch (view) {
    case CRUDPages.edit:
      const res = await pageDefinition.loader!(currentId!);
      if (!res.data) {
        return notFound();
      }
      return res;
    case CRUDPages.new:
      return (pageDefinition as PageDefinition<'new'>)?.loader?.();
    case CRUDPages.list:
      return (pageDefinition as PageDefinition<'list'>).loader!();
    default:
      throw new Error('Not implemented');
  }
};
