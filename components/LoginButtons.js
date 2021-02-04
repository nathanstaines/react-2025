import { Button, Flex } from '@chakra-ui/react';
import { GitHubIcon, GoogleIcon } from './Icons';

import { useAuth } from '@/lib/auth';

const LoginButtons = () => {
  const { signInWithGitHub, signInWithGoogle } = useAuth();

  return (
    <Flex direction={['column', 'row']}>
      <Button
        bg="gray.900"
        color="white"
        leftIcon={<GitHubIcon />}
        mb={[2, 0]}
        mr={[null, 2]}
        onClick={() => signInWithGitHub('/sites')}
        _hover={{
          bg: 'gray.700',
        }}
      >
        Sign in with GitHub
      </Button>
      <Button
        bg="white"
        color="gray.900"
        leftIcon={<GoogleIcon />}
        onClick={() => signInWithGoogle('/sites')}
      >
        Sign in with Google
      </Button>
    </Flex>
  );
};

export default LoginButtons;
