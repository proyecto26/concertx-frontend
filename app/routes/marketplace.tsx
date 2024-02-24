import { useState } from 'react'

import type { Product } from '~/models/product';
import Layout from '~/components/Layout';
import MarketplacePage from '~/pages/Marketplace';

export default function Index() {
  
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Basic Tee 8-Pack',
      price: 2000,
      description: 'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
      imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
    }
  ])
  return (
    <Layout>
      <MarketplacePage products={products} />
    </Layout>
  );
}
