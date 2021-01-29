import { Box, Code, Switch } from '@chakra-ui/react';
import { Table, Td, Th, Tr } from './Table';

import DeleteFeedbackButton from './DeleteFeedbackButton';

const FeedbackTable = (props) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th>{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {props.feedback.map((feedback) => (
            <Box as="tr" key={feedback.id}>
              <Td fontWeight="medium">{feedback.author}</Td>
              <Td>{feedback.text}</Td>
              <Td>
                <Code>{feedback.route || '/'}</Code>
              </Td>
              <Td>
                <Switch
                  colorScheme="cyan"
                  defaultChecked={feedback.status === 'active'}
                />
              </Td>
              <Td>
                <DeleteFeedbackButton feedbackId={feedback.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;
