'use client';

import {
  Container,
  type ContainerProps,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { LuAlignRight } from 'react-icons/lu';
import {
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from '../../ui';
import { Sidebar } from './Sidebar';
import { SidebarSlots } from '../../../types';

export const Navbar = ({ slots, ...props }: ContainerProps & SidebarSlots) => {
  return (
    <Container
      py="2.5"
      background="bg.panel"
      borderBottomWidth="1px"
      {...props}
    >
      <HStack justify="space-between">
        <DrawerRoot placement="start">
          <DrawerTrigger asChild>
            <IconButton
              aria-label="Open Menu"
              variant="ghost"
              colorPalette="gray"
            >
              <LuAlignRight />
            </IconButton>
          </DrawerTrigger>
          <DrawerBackdrop />
          <DrawerContent>
            <DrawerCloseTrigger colorPalette="gray" />
            <Sidebar slots={slots} />
          </DrawerContent>
        </DrawerRoot>
      </HStack>
    </Container>
  );
};
