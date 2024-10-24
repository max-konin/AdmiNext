import { Button } from '@chakra-ui/react';
import React from 'react';

export const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Button type="submit">{children}</Button>;
