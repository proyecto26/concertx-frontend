
import { useWallet } from '@solana/wallet-adapter-react';
import Layout from '~/components/Layout';
import AuthorPage from '~/pages/Author';

export default function Index() {
  const { publicKey } = useWallet();
  return (
    <Layout>
      <AuthorPage address={publicKey?.toBase58()} />
    </Layout>
  );
}
