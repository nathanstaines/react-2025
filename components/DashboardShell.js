import { Avatar, Box, Button, Flex, Link } from '@chakra-ui/react';

import NextLink from 'next/link';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const { signOut, user } = useAuth();

  return (
    <Box bg="gray.100" h="100vh">
      <Flex
        bg="white"
        borderTop="5px"
        borderTopColor="cyan.500"
        borderTopStyle="solid"
        mb={[8, 16]}
        w="full"
      >
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
            <NextLink href="/dashboard" passHerf>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHerf>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex align="center" justify="center">
            {user && (
              <Button mr={4} onClick={() => signOut()} variant="link">
                Sign out
              </Button>
            )}
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" m="0 auto" maxW="1280px" px={8}>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
