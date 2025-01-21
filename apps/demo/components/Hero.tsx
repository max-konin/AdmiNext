import { Button } from './ui/button';
import { Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';

export const Hero = () => {
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
          <Button size="lg" px="6">
            Get started <LuArrowRight />
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
};
