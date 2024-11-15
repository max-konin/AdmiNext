import { Box } from '@chakra-ui/react';
import React from 'react';
import { Button } from '../../ui';

export const SubmitButton: React.FC<{
  children: React.ReactNode;
  isPending: boolean;
}> = ({ children, isPending }) => (
  <Box mt={2}>
    <Button type="submit" loading={isPending}>
      {children}
    </Button>
  </Box>
);
