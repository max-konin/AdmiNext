import { Button } from './ui/button';
import { Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

export const Hero = () => {
  const docsUrl = process.env.DOCS_URL || 'http://localhost:3001';
  return (
    <Container maxW="7xl" py={{ base: '16', md: '24' }}>
      <Stack gap="12" align={{ sm: 'center' }} textAlign="center">
        <Stack gap="6" maxW={{ md: '3xl' }}>
          <Stack gap="4">
            <Heading size={{ base: '4xl', md: '6xl' }}>
              Admin Panel for Next.js
            </Heading>
            <Text fontSize="xl" color="fg.muted">
              Supports any ORM like Prisma, Drizzle, TypeORM, Sequelize, and
              more.
            </Text>
          </Stack>
        </Stack>

        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap="3"
          align={{ md: 'center' }}
        >
          <Button asChild size="lg" px="6">
            <a href={docsUrl} target="_blank">
              Get started <LuArrowRight />
            </a>
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
};
