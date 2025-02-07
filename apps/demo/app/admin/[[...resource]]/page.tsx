import { DataProvider } from '@adminext/core/server';
import { RouteProps } from '@adminext/core';
import { AdminPanel } from './admin-panel';
import { adminResources } from './drizzle-repositories/model';

export default async function Home(props: RouteProps) {
  return (
    <DataProvider resources={adminResources} routeProps={props}>
      {(data) => <AdminPanel {...data} />}
    </DataProvider>
  );
}
