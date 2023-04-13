import { json, LoaderFunction } from '@remix-run/node';
import { isPrefetch } from 'remix-utils';

import Layout from '~/components/Layout';
import HomePage from '~/pages/Home';

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
    <Layout title='TESTING'>
      <HomePage />
    </Layout>
  );
}
