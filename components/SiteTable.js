import { Box, Link } from '@chakra-ui/react';
import { Table, Td, Th, Tr } from './Table';
import { format, parseISO } from 'date-fns';

import React from 'react';

const SiteTable = ({ sites }) => {
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
        {sites.map((site) => (
          <Box as="tr" key={site.url}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td>{site.url}</Td>
            <Td>
              <Link>View feedback</Link>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
