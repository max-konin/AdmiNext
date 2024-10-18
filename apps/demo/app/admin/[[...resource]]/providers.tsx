'use client';

import { ChakraProvider, extendTheme, baseTheme } from '@chakra-ui/react';
import { useMemo } from 'react';

export const useCustomTheme = () => {
  return useMemo(
    () =>
      extendTheme({
        styles: {
          global: {
            body: {
              bg: baseTheme.colors.gray[50],
            },
          },
        },
        colors: {
          bg: {
            accent: {
              default: baseTheme.colors.blue[500],
              subtle: baseTheme.colors.blue[100],
            },
          },
          fg: {
            accent: {
              default: baseTheme.colors.white,
              muted: baseTheme.colors.gray[500],
            },
          },
        },
      }),
    []
  );
};

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = useCustomTheme();
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
