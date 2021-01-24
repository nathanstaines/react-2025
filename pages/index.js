import { Button, Code, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import Head from 'next/head';

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <title>React 2025</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Heading>React 2025</Heading>

        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>

        {auth.user ? (
          <Button onClick={(e) => auth.signOut()}>SignOut</Button>
        ) : (
          <Button onClick={(e) => auth.signInWithGitHub()}>SignIn</Button>
        )}
      </main>
    </div>
  );
}
