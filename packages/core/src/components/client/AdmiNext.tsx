import { Container } from '@chakra-ui/react';
import {
  AdmiNextContextType,
  CRUDPages,
  CustomPage,
  CustomPageDefinition,
  DataProviderChildrenProps,
  ResourcePage,
  Resources,
  SidebarSlots,
} from '../../types';

import { MainLayout } from './MainLayout';
import {
  ResourceEditView,
  ResourceListView,
  ResourceNewView,
} from './resource-views';
import { AdmiNextContextProvider } from '../../contexts';
import { ReactNode } from 'react';
import { DefaultDashboard } from './DefaultDashboard';

export type AdmiNextProps = DataProviderChildrenProps &
  AdmiNextContextType &
  SidebarSlots;

export function AdmiNext({
  resourcesDefinition,
  routePrefix,
  slots,
  dashboard,
  customPages = [],
  ...pageData
}: AdmiNextProps) {
  return (
    <AdmiNextContextProvider
      resourcesDefinition={resourcesDefinition}
      routePrefix={routePrefix}
    >
      <MainLayout slots={slots} dashboard={dashboard} customPages={customPages}>
        <Container>
          {renderPage(
            pageData,
            resourcesDefinition,
            routePrefix,
            customPages,
            dashboard
          )}
        </Container>
      </MainLayout>
    </AdmiNextContextProvider>
  );
}

const renderPage = (
  pageData: DataProviderChildrenProps,
  resourcesDef: Resources,
  routePrefix: string,
  customPages: CustomPageDefinition[],
  dashboard?: ReactNode
) => {
  if ((pageData as ResourcePage).resource === 'dashboard') {
    return dashboard;
  }

  if ((pageData as ResourcePage).resource === 'custom-page') {
    const page = customPages.filter(
      (el) => el.route === (pageData as CustomPage).route
    );
    return page[0]?.render?.();
  }

  return renderResourcePage(
    pageData as ResourcePage,
    resourcesDef,
    routePrefix
  );
};

const renderResourcePage = (
  pageData: ResourcePage,
  resourcesDef: Resources,
  routePrefix: string
) => {
  const resourceDef = resourcesDef[pageData.resource];

  if (!resourceDef) throw new Error('Resource Def not found');

  switch (pageData.view) {
    case CRUDPages.list:
      return (
        <ResourceListView
          resourceDef={resourceDef}
          loaderData={pageData.loaderData}
          routePrefix={routePrefix}
          resource={pageData.resource}
        />
      );
    case CRUDPages.edit:
      return (
        <ResourceEditView
          resourceDef={resourceDef}
          loaderData={pageData.loaderData}
          routePrefix={routePrefix}
          resource={pageData.resource}
        />
      );
    case CRUDPages.new:
      return (
        <ResourceNewView
          resourceDef={resourceDef}
          loaderData={pageData.loaderData}
          routePrefix={routePrefix}
          resource={pageData.resource}
        />
      );
    default:
      throw new Error('Not implemented');
  }
};
