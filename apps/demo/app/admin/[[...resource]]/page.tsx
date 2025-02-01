import { DataProvider } from '@adminext/core/server';
import { DataProviderChildrenProps, RouteProps } from '@adminext/core';
import { adminResources } from './model';
import { AdminPanel } from './admin-panel';
import { customPages } from './customPages';

export default async function Home(props: RouteProps) {
  return (
    <DataProvider
      resources={adminResources}
      routeProps={props}
      customPages={customPages}
    >
      {(data: DataProviderChildrenProps) => <AdminPanel {...data} />}
    </DataProvider>
  );
}
