'use client';

import { DataProviderChildrenProps } from '@adminext/core';
import { AdmiNext } from '@adminext/core/client';
import { Box, HStack, Text } from '@chakra-ui/react';
import { adminResources } from './model';

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
      slots={{
        user: () => <UserProfile />,
      }}
    />
  );
};
