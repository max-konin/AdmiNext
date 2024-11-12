import { Box, Button } from '@chakra-ui/react';
import React from 'react';

export const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box mt={2}>
    <Button type="submit">{children}</Button>
  </Box>
);
