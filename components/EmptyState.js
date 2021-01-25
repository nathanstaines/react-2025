import { Flex, Heading, Text } from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';
import DashboardShell from './DashboardShell';
import React from 'react';

const EmptyState = () => (
  <DashboardShell>
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
        You haven't added any sites.
      </Heading>
      <Text mb={4}>Let's get started.</Text>
      <AddSiteModal />
    </Flex>
  </DashboardShell>
);

export default EmptyState;
