'use client';

import { Container, Stack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { Navbar, Sidebar } from './sidebar';

export type MainLayoutProps = PropsWithChildren;

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        data-testid="layout-vendor"
      >
        <Navbar hideFrom="md" />
        <Sidebar hideBelow="md" />
        <Container flex="1" p={{ base: '4', md: '6' }}>
          {children}
        </Container>
      </Stack>
    </>
  );
};
