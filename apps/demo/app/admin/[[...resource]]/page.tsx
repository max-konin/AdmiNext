import { DataProvider } from '@adminext/core/server';
import { RouteProps } from '@adminext/core';
import { adminResources } from './model';
import { AdmiNext } from '@adminext/core/client';

export default async function Home(props: RouteProps) {
  return (
    <DataProvider resources={adminResources} routeProps={props}>
      {(data) => (
        <AdmiNext
          resourcesDefinition={adminResources}
          routePrefix="admin"
          {...data}
        />
      )}
    </DataProvider>
  );
}
