import { DataProvider } from '@adminext/core/server';
import { RouteProps } from '@adminext/core';
import { adminResources } from './model';
import { AdminPanel } from './admin-panel';

export default async function Home(props: RouteProps) {
  return (
    <DataProvider resources={adminResources} routeProps={props}>
      {(data) => <AdminPanel {...data} />}
    </DataProvider>
  );
}
