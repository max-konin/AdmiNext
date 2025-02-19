'use client';

import { DataProviderChildrenProps } from '@adminext/core';
import { AdmiNext } from '@adminext/core/client';
import { adminResources } from '../[[...resource]]/_lib/model';
import { Box, HStack, Text } from '@chakra-ui/react';
import { customPages } from './custom-pages';
import { Dashboard } from './Dashboard';

export const UserProfile = () => {
  return (
    <HStack gap="3" justify="space-between" data-testid="user-profile">
      <HStack gap="3">
        <Box>
          <Text textStyle="sm" fontWeight="medium">
            User Name
          </Text>
          <Text textStyle="sm" color="fg.muted">
            user@example.com
          </Text>
        </Box>
      </HStack>
    </HStack>
  );
};

export const AdminPanel = (props: DataProviderChildrenProps) => {
  return (
    <AdmiNext
      {...props}
      resourcesDefinition={adminResources}
      routePrefix="admin"
      dashboard={<Dashboard />}
      customPages={customPages}
      slots={{
        user: () => <UserProfile />,
      }}
    />
  );
};
