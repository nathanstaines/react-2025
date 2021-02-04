import { Box, Code, Switch } from '@chakra-ui/react';

import DeleteFeedbackButton from './DeleteFeedbackButton';
import { Td } from './Table';
import { mutate } from 'swr';
import { updateFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const FeedbackRow = ({ id, author, route, status, text }) => {
  const { user } = useAuth();
  const isChecked = status === 'active';

  const toggleFeedback = async () => {
    await updateFeedback(id, { status: isChecked ? 'pending' : 'active' });
    mutate(['/api/feedback', user.token]);
  };

  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || '/'}</Code>
      </Td>
      <Td>
        <Switch
          colorScheme="cyan"
          isChecked={isChecked}
          onChange={toggleFeedback}
        />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
