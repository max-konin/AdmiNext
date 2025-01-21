import {
  Container,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/react';
import {
  LuBrush,
  LuDatabase,
  LuFlaskConical,
  LuHammer,
  LuZap,
} from 'react-icons/lu';
import { SiTypescript } from 'react-icons/si';

export const Features = () => {
  return (
    <Container maxW="5xl">
      <Stack align={{ md: 'center' }} gap={{ base: '8', md: '20' }}>
        <Stack
          align={{ base: 'flex-start', md: 'center' }}
          gap="2"
          maxW="3xl"
          w="full"
        >
          <Heading
            as="h2"
            textStyle={{ base: '3xl', md: '4xl' }}
            textAlign={{ md: 'center' }}
          >
            Features
          </Heading>
        </Stack>
      </Stack>
      <SimpleGrid columns={{ base: 2, md: 3 }} gap="10" py="12">
        {features.map((feature) => (
          <Stack key={feature.title} gap="3">
            <Icon color="colorPalette.solid" size="lg">
              {feature.icon}
            </Icon>
            <Text fontWeight="medium">{feature.title}</Text>
            <Text color="fg.muted" mb="3">
              {feature.description}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Container>
  );
};

const features = [
  {
    icon: <LuZap />,
    title: 'App Router support.',
    description: 'Built-in support for Next.js App Router.',
  },
  {
    icon: <LuHammer />,
    title: 'Declarative CRUD creation.',
    description: 'Create CRUD pages in declarative way.',
  },
  {
    icon: <LuDatabase />,
    title: 'Supports any backend.',
    description:
      'Prisma, Drizzle, TypeORM, Sequelize, GraphQL, RestAPI and more.',
  },
  {
    icon: <SiTypescript />,
    title: 'TypeScript',
    description: 'Built with TypeScript',
  },
  {
    icon: <LuBrush />,
    title: 'Customizable',
    description: 'Customize the theme and pages.',
  },
  {
    icon: <LuFlaskConical />,
    title: 'Playwright test helpers',
    description: 'Built-in Playwright test helpers.',
  },
];
