import type { Preview } from '@storybook/react';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default preview;
