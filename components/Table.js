import { Box, Text } from '@chakra-ui/react';

export const Th = (props) => (
  <Text
    as="th"
    color="gray.500"
    fontSize="xs"
    fontWeight="medium"
    px={4}
    textTransform="uppercase"
    {...props}
  />
);

export const Td = (props) => (
  <Box
    as="td"
    borderBottom="1px solid"
    borderBottomColor="gray.100"
    color="gray.900"
    p={4}
    {...props}
  />
);

export const Tr = (props) => (
  <Box
    as="tr"
    backgroundColor="gray.50"
    borderBottom="1px solid"
    borderBottomColor="gray.200"
    borderTopLeftRadius={8}
    borderTopRightRadius={8}
    height="40px"
    {...props}
  />
);

export const Table = (props) => {
  return (
    <Box
      as="table"
      backgroundColor="white"
      borderRadius={8}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
      ml={0}
      mr={0}
      textAlign="left"
      {...props}
    />
  );
};
