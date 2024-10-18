'use client';

import { Box, Flex, Stack, useColorModeValue as mode } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { SidebarMenu, SidebarMenuProps } from './SidebarMenu';

export type TeamLayoutProps = PropsWithChildren & SidebarMenuProps;

export const MainLayout = ({
  children,
  ...sidebarMenuProps
}: TeamLayoutProps) => {
  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <Box w="64" bg="gray.900" color="white" fontSize="sm">
          <Flex h="full" direction="column" px="4" py="4">
            <Stack spacing="8" flex="1" overflow="auto" pt="8">
              <SidebarMenu {...sidebarMenuProps} />
            </Stack>
          </Flex>
        </Box>
        <Box bg={mode('white', 'gray.800')} flex="1" p="6" overflow="scroll">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
