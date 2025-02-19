import { DataProvider } from '@adminext/core/server';
import { DataProviderChildrenProps, RouteProps } from '@adminext/core';
import { adminResources } from './_lib/model';
import { AdminPanel } from '../_components/AdminPanel';
import { customPages } from '../_components/custom-pages';

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
