'use client';

import {
  Container,
  type ContainerProps,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import {
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from '../../ui';
import { Sidebar } from './Sidebar';
import { SidebarSlots } from '../../../types';
import { AlignRightIcon } from '../../icons/AlignRightIcon';

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
              <AlignRightIcon />
            </IconButton>
          </DrawerTrigger>
          <DrawerBackdrop />
          <DrawerContent>
            <DrawerCloseTrigger colorPalette="gray" zIndex="10" />
            <Sidebar slots={slots} />
          </DrawerContent>
        </DrawerRoot>
      </HStack>
    </Container>
  );
};
