const { NextSeo } = require('next-seo');

const Page = ({ name, path, children }) => {
  const title = `React 2025 - ${name}`;
  const url = `https://react-2025.nathanstaines.vercel.app${path}`;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      {children}
    </>
  );
};

export default Page;
