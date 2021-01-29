const title = 'React 2025';
const description = 'A Fast Feedback clone';
const url = 'https://react-2025.nathanstaines.vercel.app';

const SEO = {
  title,
  description,
  canonical: url,
  openGraph: {
    type: 'website',
    url,
    title,
    description,
    images: [
      {
        url: `${url}/og.jpg`,
        width: 800,
        height: 600,
        alt: title,
      },
    ],
  },
};

export default SEO;
