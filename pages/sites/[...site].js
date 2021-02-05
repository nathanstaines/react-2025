import { Box, Button, Flex, FormControl, Textarea } from '@chakra-ui/react';
import useSWR, { mutate } from 'swr';

import DashboardShell from '@/components/DashboardShell';
import Feedback from '@/components/Feedback';
import LoginButtons from '@/components/LoginButtons';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';
import { createFeedback } from '@/lib/db';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import { useRef } from 'react';
import { useRouter } from 'next/router';

const FeedbackPage = () => {
  const { loading, user } = useAuth();
  const inputEl = useRef(null);
  const router = useRouter();

  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;

  const { data: siteData } = useSWR(`/api/sites/${siteId}`, fetcher);
  const { data: feedbackData } = useSWR(feedbackApi, fetcher);

  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      route: route || '/',
      siteAuthorId: site.authorId,
      siteId,
      status: 'pending',
      text: inputEl.current.value,
    };

    inputEl.current.value = '';

    createFeedback(newFeedback);

    mutate(
      feedbackApi,
      async (data) => ({
        feedback: [newFeedback, ...data.feedback],
      }),
      false
    );
  };

  const LoginOrLeaveFeedback = () =>
    user ? (
      <Button
        bg="gray.900"
        color="white"
        isDisabled={!siteData || !feedbackData}
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
      <SiteFeedbackTableHeader
        isSiteOwner={site?.authorId === user?.uid}
        route={route}
        site={site}
        siteId={siteId}
      />
      <Flex direction="column" maxW="700px" w="full">
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <Textarea
              bg="white"
              focusBorderColor="cyan.500"
              isDisabled={!user}
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
            <Feedback
              key={feedback.id}
              settings={site?.settings}
              {...feedback}
            />
          ))}
      </Flex>
    </DashboardShell>
  );
};

export default FeedbackPage;
