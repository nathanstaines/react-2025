import { Flex, Heading, Text } from '@chakra-ui/react';

const FeedbackEmptyState = () => (
  <Flex
    align="center"
    bg="white"
    borderRadius="8px"
    direction="column"
    justify="center"
    p={16}
    w="100%"
  >
    <Heading size="lg" mb={2}>
      There isn't any feedback.
    </Heading>
    <Text mb={4}>Share your site!</Text>
  </Flex>
);

export default FeedbackEmptyState;
