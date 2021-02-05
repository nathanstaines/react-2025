import { formatHeaders, logger } from '@/utils/logger';

import { getAllFeedback } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const [siteId, route] = req.query.site;
    const { feedback } = await getAllFeedback(siteId, route);

    res.status(200).json({ feedback });
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
