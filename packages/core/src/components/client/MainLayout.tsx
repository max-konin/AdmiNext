'use client';

import { Container, Stack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { Navbar, Sidebar } from './sidebar';
import { SidebarSlots } from '../../types';

export type MainLayoutProps = PropsWithChildren & SidebarSlots;

export const MainLayout = ({ children, slots }: MainLayoutProps) => {
  return (
    <>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        data-testid="layout-vendor"
      >
        <Navbar hideFrom="md" slots={slots} />
        <Sidebar hideBelow="md" slots={slots} />
        <Container flex="1" p={{ base: '4', md: '6' }}>
          {children}
        </Container>
      </Stack>
    </>
  );
};
