'use client';

import { ClientOnly, Skeleton } from '@chakra-ui/react';
import { ThemeProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { LuMoon, LuSun } from 'react-icons/lu';
import { NavItem } from '../client/sidebar/NavItem';

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };
  return {
    colorMode: resolvedTheme,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === 'light' ? light : dark;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === 'light' ? <LuSun /> : <LuMoon />;
}

export const ColorModeNavItem = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ClientOnly
      fallback={
        <Skeleton
          position="absolute"
          bottom={2}
          boxSize="8"
          backgroundColor="gray.700"
          width="200px"
        />
      }
    >
      <NavItem
        onClick={toggleColorMode}
        label={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        icon={<ColorModeIcon />}
      />
    </ClientOnly>
  );
};
