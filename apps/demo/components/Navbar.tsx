import { Box, Container, Heading, HStack, Spacer } from '@chakra-ui/react';
import { Button } from './ui/button';
import Link from 'next/link';
import { ColorModeButton } from './ui/color-mode';

export const Navbar = () => {
  return (
    <Box
      borderBottomWidth="1px"
      bg="bg.panel"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Container py={{ base: '3.5', md: '4' }}>
        <HStack justify="space-between">
          <Heading size="2xl">AdmiNext</Heading>
          <Spacer hideFrom="md" />
          <HStack gap="4">
            <ColorModeButton />
            <Button size={{ base: 'sm', md: 'md' }} asChild>
              <Link href="/admin">Demo</Link>
            </Button>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
