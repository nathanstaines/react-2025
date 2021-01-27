import { Box, Skeleton } from '@chakra-ui/react';
import { Table, Td, Th, Tr } from './Table';

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

const FeedbackTableSkeleton = () => {
  return (
    <Table>
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
        <SkeletonRow width="75px" />
        <SkeletonRow width="125px" />
        <SkeletonRow width="50px" />
        <SkeletonRow width="100px" />
        <SkeletonRow width="75px" />
      </tbody>
    </Table>
  );
};

export default FeedbackTableSkeleton;
