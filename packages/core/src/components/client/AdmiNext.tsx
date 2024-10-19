import { CRUDPages } from '../../types';
import {
  CurrentPageData,
  ResourcePage,
  ResourcesDefinition,
  type DataProviderChildrenProps,
} from '../server';
import { MainLayout } from './MainLayout';
import { ResourceListView } from './resource-views';

export type AdmiNextProps = DataProviderChildrenProps & {
  routePrefix: string;
};

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
      {renderResourcePageOrDashboard(
        pageData,
        resourcesDefinition,
        routePrefix
      )}
    </MainLayout>
  );
}

const renderResourcePageOrDashboard = (
  pageData: CurrentPageData,
  resourcesDef: ResourcesDefinition,
  routePrefix: string
) => {
  if (pageData.resource === 'dashboard') {
    return <div>Dashboard</div>;
  }

  return renderResourcePage(
    pageData as ResourcePage,
    resourcesDef,
    routePrefix
  );
};

const renderResourcePage = (
  pageData: ResourcePage,
  resourcesDef: ResourcesDefinition,
  routePrefix: string
) => {
  const resourceDef = resourcesDef[pageData.resource];

  if (!resourceDef) throw new Error('Resource Def not found');

  switch (pageData.view) {
    case CRUDPages.list:
      return (
        <ResourceListView
          resourceDef={resourceDef}
          data={pageData.data}
          routePrefix={routePrefix}
        />
      );

    default:
      throw new Error('Not implemented');
  }
};
