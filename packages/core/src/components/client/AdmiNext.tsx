import { Container } from '@chakra-ui/react';
import {
  AdmiNextContextType,
  CRUDPages,
  CustomPage,
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
            dashboard,
            customPages
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
  dashboard: ReactNode,
  customPages: CustomPage[]
) => {
  if ((pageData as ResourcePage).resource === 'dashboard') {
    return dashboard;
  }

  if ((pageData as ResourcePage).resource === 'customPage') {
    const page = customPages.filter(
      (el) => el.title === (pageData as CustomPage).title
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
