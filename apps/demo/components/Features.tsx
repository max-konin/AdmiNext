import {
  Container,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/react';
import { ZapIcon } from './icons/ZapIcon';
import { HummerIcon } from './icons/HummerIcon';
import { DatabaseIcon } from './icons/DatabaseIcon';
import { TypescriptIcon } from './icons/TypescriptIcon';
import { BrushIcon } from './icons/BrushIcon';
import { FlaskConicalIcon } from './icons/FlaskConicalIcon';

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
    icon: <ZapIcon />,
    title: 'App Router support.',
    description: 'Built-in support for Next.js App Router.',
  },
  {
    icon: <HummerIcon />,
    title: 'Declarative CRUD creation.',
    description: 'Create CRUD pages in declarative way.',
  },
  {
    icon: <DatabaseIcon />,
    title: 'Supports any backend.',
    description:
      'Prisma, Drizzle, TypeORM, Sequelize, GraphQL, RestAPI and more.',
  },
  {
    icon: <TypescriptIcon />,
    title: 'TypeScript',
    description: 'Built with TypeScript',
  },
  {
    icon: <BrushIcon />,
    title: 'Customizable',
    description: 'Customize the theme and pages.',
  },
  {
    icon: <FlaskConicalIcon />,
    title: 'Playwright test helpers',
    description: 'Built-in Playwright test helpers.',
  },
];
