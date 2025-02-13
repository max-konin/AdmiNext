import {
  Badge,
  Box,
  Card,
  Heading,
  Separator,
  SimpleGrid,
  Stack,
  Stat,
  Text,
} from '@chakra-ui/react';

export const Dashboard = () => {
  return (
    <Stack data-testid="dashboard-page" gap="6">
      <Heading>Dashboard</Heading>
      <Text>Feb 1 - Apr 1, United States</Text>
      <SimpleGrid columns={{ base: 2, lg: 3, md: 2 }} gap="3">
        {stats.map((item) => (
          <Card.Root
            key={item.header}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            mb={4}
          >
            <Box p={4}>
              <Card.Header fontWeight="bold" p="0">
                {item.header}
              </Card.Header>
              <Card.Title mt={2}>{item.value}</Card.Title>
            </Box>
            <Separator></Separator>
            <Box p={4}>
              <Stat.Root>
                <Stat.Label>
                  <Badge colorScheme="green">
                    {item.indicator === 'increase' ? (
                      <Stat.UpIndicator />
                    ) : (
                      <Stat.DownIndicator />
                    )}
                    {item.diff}
                  </Badge>
                </Stat.Label>
                <Stat.ValueUnit>
                  {item.indicator} since last month
                </Stat.ValueUnit>
              </Stat.Root>
            </Box>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

const stats = [
  {
    header: 'Customers',
    value: '234k',
    diff: '18.2%',
    indicator: 'increase',
  },
  {
    header: 'Revenue',
    value: '$2.4k',
    diff: '3.6%',
    indicator: 'increase',
  },
  {
    header: 'Unique',
    value: '192k',
    diff: '1.1%',
    indicator: 'increase',
  },
  {
    header: 'This week',
    value: '4320k',
    diff: '4.6%',
    indicator: 'decrease',
  },
  {
    header: 'Traffic',
    value: '64k',
    diff: '2.5%',
    indicator: 'decrease',
  },
  {
    header: 'Sales',
    value: '$1234k',
    diff: '4.9%',
    indicator: 'increase',
  },
];
