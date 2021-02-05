import { Flex, Text } from '@chakra-ui/react';
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin';

import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';
import { useRouter } from 'next/router';

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);
  const { site } = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();

  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()],
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

const EmbeddedFeedbackPage = ({ initialFeedback, site }) => {
  const router = useRouter();

  return (
    <Flex direction="column" w="full">
      <FeedbackLink paths={router?.query?.site || []} />
      {initialFeedback?.length ? (
        initialFeedback.map((feedback) => (
          <Feedback key={feedback.id} settings={site?.settings} {...feedback} />
        ))
      ) : (
        <Text>There are no comments for this site.</Text>
      )}
    </Flex>
  );
};

export default EmbeddedFeedbackPage;
