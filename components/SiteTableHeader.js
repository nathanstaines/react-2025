import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';

const SiteTableHeader = () => (
  <>
    <Breadcrumb>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justify="space-between">
      <Heading mb={8}>My sites</Heading>
      <AddSiteModal>+ Add site</AddSiteModal>
    </Flex>
  </>
);

export default SiteTableHeader;
