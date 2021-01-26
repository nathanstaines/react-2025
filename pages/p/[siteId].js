import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { useRef, useState } from 'react';

import Feedback from '@/components/Feedback';
import { createFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
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
    fallback: false,
  };
}

const FeedbackPage = ({ initialFeedback }) => {
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const { user } = useAuth();
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

  return (
    <Flex direction="column" m="0 auto" maxW="700px" w="full">
      {user && (
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input
              id="comment"
              mb={4}
              placeholder="Leave a comment"
              ref={inputEl}
            />
            <Button type="submit">Add comment</Button>
          </FormControl>
        </Box>
      )}

      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Flex>
  );
};

export default FeedbackPage;
