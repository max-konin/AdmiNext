'use client';

import { DataProviderChildrenProps } from '@adminext/core';
import { AdmiNext } from '@adminext/core/client';
import { adminResources } from './model';

export const AdminPanel = (props: DataProviderChildrenProps) => {
  return (
    <AdmiNext
      {...props}
      resourcesDefinition={adminResources}
      routePrefix="admin"
    />
  );
};
