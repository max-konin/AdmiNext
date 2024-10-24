import { Stack } from '@chakra-ui/react';
import React from 'react';

export const Form = React.forwardRef<
  HTMLFormElement,
  React.ComponentProps<'form'>
>(({ children, ...props }, ref) => {
  return (
    <form ref={ref} noValidate autoComplete="off" {...props}>
      <Stack gap={4}>{children}</Stack>
    </form>
  );
});
