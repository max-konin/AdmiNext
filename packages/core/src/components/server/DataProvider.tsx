import { ReactNode } from 'react';
import {
  CRUDPageName,
  CRUDPages,
  CustomPage,
  DataProviderChildrenProps,
  PageDefinition,
  Resources,
  RouteProps,
} from '../../types';
import { notFound } from 'next/navigation';

export type DataProviderProps = {
  resources: Resources;
  customPages?: CustomPage[];
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

  if (
    customPages &&
    customPages.some((el) => el.route === resourceParams?.[0])
  ) {
    const customPage = customPages.find(
      (el) => el.route === resourceParams?.[0]
    );
    if (customPage) {
      return (
        <>
          {children({
            resource: 'customPage',
            title: customPage.title,
            route: customPage.route,
          })}
        </>
      );
    }
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
