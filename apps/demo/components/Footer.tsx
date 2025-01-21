import { Container, Stack } from '@chakra-ui/react';
import { Copyright } from './Copyright';

export const Footer = () => (
  <Container as="footer" py={{ base: '10', md: '12' }}>
    <Stack gap="6">
      <Copyright />
    </Stack>
  </Container>
);
