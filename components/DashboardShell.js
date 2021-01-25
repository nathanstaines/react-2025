import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Link,
} from '@chakra-ui/react';

import React from 'react';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const { user, signOut } = useAuth();

  return (
    <Box bg="gray.100" h="100vh">
      <Flex bg="white" mb={16} w="full">
        <Flex
          align="center"
          justify="space-between"
          m="0 auto"
          maxW="1280px"
          px={8}
          py={4}
          w="full"
        >
          <Flex>
            <Link mr={4}>Sites</Link>
            <Link>Feedback</Link>
          </Flex>
          <Flex align="center" justify="center">
            <Button mr={2} onClick={() => signOut()} variant="ghost">
              Sign out
            </Button>
            <Avatar size="sm" src={user.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" m="0 auto" maxW="1280px" px={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justify="space-between">
          <Heading mb={8}>My sites</Heading>
          <Button colorScheme="pink">+ Add site</Button>
        </Flex>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
