import { json, LoaderFunction } from '@remix-run/node';
import { isPrefetch } from 'remix-utils';

import Layout from '~/components/Layout';

export const loader: LoaderFunction = ({ request }) => {
  const headers = new Headers();
  if (isPrefetch(request)) {
    headers.set('Cache-Control', 'private, max-age=10');
  }

  return json({
    headers,
  });
};

export default function Index() {
  return (
    <Layout>
      <section className="mx-auto px-8 py-24 max-w-5xl">
        <div className="flex items-center justify-center"><img className="w-32 h-32 rounded-full mx-auto" src="/path/to/logo.jpg" alt="Logo" /></div>
        <h1 className="text-3xl text-center font-bold my-4">Welcome to concertsX</h1>
        <p className="text-xl text-center mb-8">A revolutionary crowdfunding platform for musicians</p>
        <div className="flex items-center justify-center"><a className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full" href="#">Discover</a></div>
      </section>
    </Layout>
  );
}
