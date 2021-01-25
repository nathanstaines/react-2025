import { Button, Flex, Heading } from '@chakra-ui/react';

import Head from 'next/head';
import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();

  return (
    <Flex
      align="center"
      as="main"
      direction="column"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>React 2025</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading mb={4}>React 2025</Heading>

      {auth.user ? (
        <Button as="a" href="/dashboard">
          View dashboard
        </Button>
      ) : (
        <Button onClick={(e) => auth.signInWithGitHub()}>Sign in</Button>
      )}
    </Flex>
  );
};

export default Home;
