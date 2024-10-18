import { ReactNode } from 'react';
import { CRUDPageName, Resource, RouteProps } from '../../types';
import {
  ClientResourceDefinition,
  removeServerFunctionsFromResourceDefinition,
} from '../../utils';

export type ResourcesDefinition = {
  [key: string]: ClientResourceDefinition;
};

export type DataProviderChildrenProps = {
  resourcesDefinition: ResourcesDefinition;
} & CurrentPageData;

export type DashboardPage = { resource: 'dashboard' };
export type ResourcePage = {
  resource: string;
  data: any;
  view: CRUDPageName;
};

export type CurrentPageData = DashboardPage | ResourcePage;

export type DataProviderProps = {
  resources: {
    [key: string]: Resource<any, any, any>;
  };
  routeProps: RouteProps;
  children: (props: DataProviderChildrenProps) => ReactNode;
};

export const DataProvider = async ({
  resources,
  routeProps: {
    params: { resource: resourceParams },
  },
  children,
}: DataProviderProps) => {
  const [currentResource, currentId] = resourceParams;
  const resourcesDefinition = Object.fromEntries(
    Object.entries(resources).map(([k, r]) => [
      k,
      removeServerFunctionsFromResourceDefinition(r),
    ])
  );
  if (!currentResource) {
    return (
      <>
        {children({
          resourcesDefinition,
          resource: 'dashboard',
        })}
      </>
    );
  }
  const resource = currentResource ?? 'dashboard';
  const view = currentId ? 'show' : 'list';
  const resourceDef = resources[currentResource]!;

  const data = await resourceDef.pages[view].loader(currentId);

  return (
    <>
      {children({
        resourcesDefinition,
        resource,
        data: data,
        view,
      })}
    </>
  );
};
