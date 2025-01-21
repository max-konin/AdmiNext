import { Container, Stack, StackSeparator } from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Container mt="2">
        <Stack gap="8" separator={<StackSeparator />}>
          <Hero />
          <Features />
        </Stack>
        <Footer />
      </Container>
    </>
  );
}
