import { Box } from '@chakra-ui/react';
import React from 'react';
import { Button } from '../../ui';

export const SubmitButton: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <Box mt={2}>
    <Button type="submit">{children}</Button>
  </Box>
);
