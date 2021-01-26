import { Button, Flex, Heading } from '@chakra-ui/react';

import Head from 'next/head';
import { useAuth } from '@/lib/auth';

const Home = () => {
  const { signInWithGitHub, user } = useAuth();

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('react-2025-auth')) {
                window.location.href = "/dashboard"
              }
            `,
          }}
        />
      </Head>

      <Heading mb={4}>React 2025</Heading>

      {user ? (
        <Button as="a" href="/dashboard">
          View dashboard
        </Button>
      ) : (
        <Button onClick={(e) => signInWithGitHub()}>Sign in</Button>
      )}
    </Flex>
  );
};

export default Home;
