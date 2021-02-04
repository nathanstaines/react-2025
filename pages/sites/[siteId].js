import { Box, Button, Flex, FormControl, Textarea } from '@chakra-ui/react';
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin';
import { useRef, useState } from 'react';

import DashboardShell from '@/components/DashboardShell';
import Feedback from '@/components/Feedback';
import LoginButtons from '@/components/LoginButtons';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';
import { createFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  const { site } = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();

  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

const FeedbackPage = ({ initialFeedback, site }) => {
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const { loading, user } = useAuth();
  const inputEl = useRef(null);
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending',
    };

    inputEl.current.value = '';

    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  const LoginOrLeaveFeedback = () =>
    user ? (
      <Button
        bg="gray.900"
        color="white"
        isDisabled={router.isFallback}
        type="submit"
        _hover={{
          bg: 'gray.700',
        }}
      >
        Leave feedback
      </Button>
    ) : (
      <LoginButtons />
    );

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader siteName={site?.name} />
      <Flex direction="column" maxW="700px" w="full">
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <Textarea
              bg="white"
              focusBorderColor="cyan.500"
              id="comment"
              mb={2}
              placeholder="Leave feedback"
              ref={inputEl}
            />
            {!loading && <LoginOrLeaveFeedback />}
          </FormControl>
        </Box>
        {allFeedback &&
          allFeedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
          ))}
      </Flex>
    </DashboardShell>
  );
};

export default FeedbackPage;
