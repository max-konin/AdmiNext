'use client';

import { Box, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

interface NavItemProps {
  href?: string;
  label: string;
  subtle?: boolean;
  icon?: ReactElement;
  endElement?: ReactElement;
}

export const NavItem = (props: NavItemProps) => {
  const { subtle, icon, label, endElement, href } = props;
  const pathname = usePathname();
  const active = new RegExp(`^${href}.*`).test(pathname);

  return (
    <HStack
      as={Link}
      href={href}
      w="full"
      px="3"
      py="2"
      cursor="pointer"
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      bg={active ? 'gray.700' : undefined}
      _hover={{ bg: 'gray.700' }}
      _active={{ bg: 'gray.600' }}
    >
      <Box fontSize="lg" color={active ? 'currentcolor' : 'gray.400'}>
        {icon}
      </Box>
      <Box
        flex="1"
        fontWeight="inherit"
        color={subtle ? 'gray.400' : undefined}
      >
        {label}
      </Box>
      {endElement && <Box>{endElement}</Box>}
    </HStack>
  );
};
