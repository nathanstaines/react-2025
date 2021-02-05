import { formatHeaders, logger } from '@/utils/logger';

import { getSite } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { siteId } = req.query;
    const { site } = await getSite(siteId);

    res.status(200).json({ site });
  } catch (error) {
    logger.error(
      {
        request: {
          headers: formatHeaders(req.headers),
          url: req.url,
          method: req.method,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
      error.message
    );

    res.status(500).json({ error });
  }
};
