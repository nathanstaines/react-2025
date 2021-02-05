const { Box, Divider, Heading, Text } = require('@chakra-ui/react');
const { format, parseISO } = require('date-fns');

const Feedback = ({ author, createdAt, settings, text }) => (
  <Box borderRadius={4} maxW="700px" w="full">
    <Heading as="h3" color="gray.900" fontWeight="medium" mb={0} size="sm">
      {author}
    </Heading>
    {settings?.timestamps && (
      <Text color="gray.500" fontSize="xs" mb={4}>
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
    )}
    <Text color="gray.800">{text}</Text>
    <Divider borderColor="gray.300" my={8} />
  </Box>
);

export default Feedback;
