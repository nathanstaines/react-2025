import { Button, Divider, Flex, Text } from '@chakra-ui/react';

const FeedbackLink = ({ paths }) => {
  return (
    <>
      <Flex
        align={['flex-start', 'center']}
        direction={['column', 'row']}
        justify="space-between"
        mb={8}
      >
        <Button as="a" href={`/p/${paths.join('/')}`} mb={[1, 0]} size="sm">
          Leave a comment →
        </Button>
        <Text color="gray.500" fontSize="xs">
          Powered by React 2025
        </Text>
      </Flex>
      <Divider mb={8} />
    </>
  );
};

export default FeedbackLink;
