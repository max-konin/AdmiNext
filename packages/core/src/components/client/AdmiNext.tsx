import { CRUDPages } from '../../types';
import {
  CurrentPageData,
  ResourcePage,
  ResourcesDefinition,
  type DataProviderChildrenProps,
} from '../server';
import { MainLayout } from './MainLayout';
import { ResourceListView } from './ResourceListView';

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
      {renderResourcePageOrDashboard(pageData, resourcesDefinition)}
    </MainLayout>
  );
}

const renderResourcePageOrDashboard = (
  pageData: CurrentPageData,
  resourcesDef: ResourcesDefinition
) => {
  if (pageData.resource === 'dashboard') {
    return <div>Dashboard</div>;
  }

  return renderResourcePage(pageData as ResourcePage, resourcesDef);
};

const renderResourcePage = (
  pageData: ResourcePage,
  resourcesDef: ResourcesDefinition
) => {
  const resourceDef = resourcesDef[pageData.resource];

  if (!resourceDef) throw new Error('Resource Def not found');

  switch (pageData.view) {
    case CRUDPages.list:
      return (
        <ResourceListView resourceDef={resourceDef} data={pageData.data} />
      );

    default:
      throw new Error('Not implemented');
  }
};
