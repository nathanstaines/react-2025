import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { GitHubIcon, GoogleIcon } from '@/components/Icons';

import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';
import Head from 'next/head';
import { getAllFeedback } from '@/lib/db-admin';
import { useAuth } from '@/lib/auth';

const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
    },
    revalidate: 1,
  };
}

const Home = ({ allFeedback }) => {
  const { signInWithGitHub, signInWithGoogle, user } = useAuth();

  return (
    <>
      <Box bg="gray.100">
        <Flex
          as="main"
          direction="column"
          m="0 auto"
          maxW="700px"
          px={4}
          py={16}
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
            <Flex direction={['column', 'row']}>
              <Button
                bg="gray.900"
                color="white"
                leftIcon={<GitHubIcon />}
                mb={[2, 0]}
                mr={[null, 2]}
                onClick={(e) => signInWithGitHub('/dashboard')}
                _hover={{
                  bg: 'gray.700',
                }}
              >
                Sign in with GitHub
              </Button>
              <Button
                bg="white"
                color="gray.900"
                leftIcon={<GoogleIcon />}
                onClick={(e) => signInWithGoogle('/dashboard')}
              >
                Sign in with Google
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
      <Flex direction="column" m="0 auto" maxW="700px" px={4} py={16} w="full">
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Flex>
    </>
  );
};

export default Home;
