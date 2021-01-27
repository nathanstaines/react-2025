import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { GitHubIcon, GoogleIcon } from '@/components/Icons';

import Head from 'next/head';
import { useAuth } from '@/lib/auth';

const Home = () => {
  const { signInWithGitHub, signInWithGoogle, user } = useAuth();

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

      <Heading mb={6}>React 2025</Heading>

      {user ? (
        <Button as="a" href="/dashboard">
          View dashboard
        </Button>
      ) : (
        <Stack>
          <Button
            bg="gray.900"
            color="white"
            leftIcon={<GitHubIcon />}
            mb={1}
            onClick={(e) => signInWithGitHub('/dashboard')}
            _hover={{
              bg: 'gray.700',
            }}
          >
            Sign in with GitHub
          </Button>
          <Button
            leftIcon={<GoogleIcon />}
            onClick={(e) => signInWithGoogle('/dashboard')}
          >
            Sign in with Google
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default Home;
