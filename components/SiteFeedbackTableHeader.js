import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react';

import NextLink from 'next/link';

const SiteFeedbackTableHeader = ({ siteName }) => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
        <NextLink href="/sites" passHref>
          <BreadcrumbLink>Sites</BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{siteName || '-'}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Heading mb={8}>{siteName || '-'}</Heading>
  </>
);

export default SiteFeedbackTableHeader;
