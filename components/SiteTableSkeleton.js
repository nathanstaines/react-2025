import { Box, Skeleton } from '@chakra-ui/react';
import { Table, Td, Th, Tr } from './Table';

import React from 'react';

const SkeletonRow = ({ width }) => (
  <Box as="tr">
    <Td>
      <Skeleton h="10px" my={4} w={width} />
    </Td>
    <Td>
      <Skeleton h="10px" my={4} w={width} />
    </Td>
    <Td>
      <Skeleton h="10px" my={4} w={width} />
    </Td>
    <Td>
      <Skeleton h="10px" my={4} w={width} />
    </Td>
  </Box>
);

const SiteTableSkeleton = () => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>URL</Th>
          <Th>Feedback</Th>
          <Th>Date added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        <SkeletonRow w="75px" />
        <SkeletonRow w="125px" />
        <SkeletonRow w="50px" />
        <SkeletonRow w="100px" />
        <SkeletonRow w="75px" />
      </tbody>
    </Table>
  );
};

export default SiteTableSkeleton;
