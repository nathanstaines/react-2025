import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { getAllFeedback, getSite } from '@/lib/db-admin';

import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';
import Head from 'next/head';
import LoginButtons from '@/components/LoginButtons';
import { useAuth } from '@/lib/auth';

const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;

export async function getStaticProps() {
  const { feedback } = await getAllFeedback(SITE_ID);
  const { site } = await getSite(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}

const Home = ({ allFeedback, site }) => {
  const { user } = useAuth();

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
            <link rel="icon" href="/favicon.ico" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  if (document.cookie && document.cookie.includes('react-2025-auth')) {
                    window.location.href = "/sites"
                  }
                `,
              }}
            />
          </Head>
          <Heading mb={6}>React 2025</Heading>
          {user ? (
            <Button
              as="a"
              bg="gray.900"
              color="white"
              href="/sites"
              maxW="200px"
              _hover={{
                bg: 'gray.700',
              }}
            >
              View dashboard
            </Button>
          ) : (
            <LoginButtons />
          )}
        </Flex>
      </Box>
      <Flex direction="column" m="0 auto" maxW="700px" px={4} py={16} w="full">
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} settings={site?.settings} {...feedback} />
        ))}
      </Flex>
    </>
  );
};

export default Home;
