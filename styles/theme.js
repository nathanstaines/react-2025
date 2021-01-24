import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
});

export default theme;
