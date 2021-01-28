import { logflarePinoVercel } from 'pino-logflare';
import pino from 'pino';

const { send, stream } = logflarePinoVercel({
  apiKey: process.env.NEXT_PUBLIC_LOGFLARE_KEY,
  sourceToken: process.env.NEXT_PUBLIC_LOGFLARE_SOURCE,
});

const logger = pino(
  {
    browser: {
      transmit: {
        send,
      },
    },
    level: 'debug',
    base: {
      env: process.env.NODE_ENV || 'ENV not set',
      revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
  },
  stream
);

const formatHeaders = (headers) => {
  const keyValues = {};

  Object.keys(headers).map((key) => {
    const newKey = key.replace(/-/g, '_');

    keyValues[newKey] = headers[key];
  });

  return keyValues;
};

export { formatHeaders, logger };
