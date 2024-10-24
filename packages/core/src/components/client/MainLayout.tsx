'use client';

import { Box, Flex, Stack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { SidebarMenu, SidebarMenuProps } from './sidebar';

export type MainLayoutProps = PropsWithChildren & SidebarMenuProps;

export const MainLayout = ({
  children,
  ...sidebarMenuProps
}: MainLayoutProps) => {
  return (
    <Box
      height="100vh"
      overflow="hidden"
      position="relative"
      suppressHydrationWarning
    >
      <Flex h="full" id="app-container">
        <Box w="64" bg="gray.900" color="white" fontSize="sm">
          <Flex h="full" direction="column" px="4" py="4">
            <Stack gap="8" flex="1" overflow="auto" pt="8">
              <SidebarMenu {...sidebarMenuProps} />
            </Stack>
          </Flex>
        </Box>
        <Box bg="white" flex="1" p="6" overflow="scroll">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
