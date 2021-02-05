import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import UpdateSiteModal from './UpdateSiteModal';

const SiteFeedbackTableHeader = ({ isSiteOwner, route, site, siteId }) => {
  const siteName = site?.name;

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextLink href="/sites" passHref>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        {siteName && !route && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{siteName}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {siteName && route && (
          <BreadcrumbItem>
            <NextLink href={`/sites/${siteId}`} passHref>
              <BreadcrumbLink>{siteName}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        )}
        {siteName && route && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{route}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Flex justify="space-between">
        <Heading mb={8}>{siteName || '-'}</Heading>
        {isSiteOwner && (
          <UpdateSiteModal settings={site?.settings} siteId={siteId}>
            Edit site
          </UpdateSiteModal>
        )}
      </Flex>
    </>
  );
};

export default SiteFeedbackTableHeader;
