import { Text } from '@chakra-ui/react';
import React from 'react';

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <Text color="fg.error">{error}</Text>
);
