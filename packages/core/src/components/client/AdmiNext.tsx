import { Container } from '@chakra-ui/react';
import {
  CRUDPages,
  DataProviderChildrenProps,
  ResourcePage,
  Resources,
} from '../../types';

import { MainLayout } from './MainLayout';
import {
  ResourceEditView,
  ResourceListView,
  ResourceNewView,
} from './resource-views';
import { SidebarMenuProps } from './sidebar';
import { DefaultDashboard } from './DefaultDashboard';

export type AdmiNextProps = DataProviderChildrenProps & SidebarMenuProps;

export function AdmiNext({
  resourcesDefinition,
  routePrefix,
  ...pageData
}: AdmiNextProps) {
  return (
    <MainLayout
      resourcesDefinition={resourcesDefinition}
      routePrefix={routePrefix}
    >
      <Container>
        {renderResourcePageOrDashboard(
          pageData,
          resourcesDefinition,
          routePrefix
        )}
      </Container>
    </MainLayout>
  );
}

const renderResourcePageOrDashboard = (
  pageData: DataProviderChildrenProps,
  resourcesDef: Resources,
  routePrefix: string
) => {
  if (pageData.resource === 'dashboard') {
    return <DefaultDashboard />;
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
