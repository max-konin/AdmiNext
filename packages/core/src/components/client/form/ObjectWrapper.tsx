import { FC } from 'react';
import { ObjectWrapperProps } from '@autoform/react';
import { Box, Stack } from '@chakra-ui/react';

export const ObjectWrapper: FC<ObjectWrapperProps> = ({ label, children }) => {
  return (
    <Box w="full" p="2" borderWidth="1px" borderColor="border.disabled">
      <Stack gap="2">{children}</Stack>
    </Box>
  );
};
