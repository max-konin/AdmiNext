import { Box, Heading } from '@chakra-ui/react';
import { CustomPageDefinition } from '../../types';

export const customPages: CustomPageDefinition[] = [
  {
    title: 'Custom Page Example',
    route: 'custom-page-example',
    render: () => <CustomPageExample />,
  },
];

export const CustomPageExample = () => {
  return (
    <Box>
      <Heading>Custom Page Example</Heading>
    </Box>
  );
};
