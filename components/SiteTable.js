import { Box, Link } from '@chakra-ui/react';
import { Table, Td, Th, Tr } from './Table';
import { format, parseISO } from 'date-fns';

import NextLink from 'next/link';

const SiteTable = ({ sites }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
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
            <Box as="tr" key={site.id}>
              <Td fontWeight="medium">{site.name}</Td>
              <Td>
                <Link
                  href={site.url}
                  isExternal
                  textDecoration="underline"
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  {site.url}
                </Link>
              </Td>
              <Td>
                <NextLink as={`/p/${site.id}`} href="/p/[siteId]" passHref>
                  <Link
                    textDecoration="underline"
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    View feedback
                  </Link>
                </NextLink>
              </Td>
              <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default SiteTable;
