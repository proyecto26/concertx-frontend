import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { MINT_USDC, SHYFT_API_URL, WALLET_ADDRESS } from '~/constants';
import { canUseDOM } from '~/utils/dom';

export type UseFindMarketplaceProps = {
  network: string;
  address?: string;
  currencyAddress?: string;
};

export const useFindMarketplace = ({
  network,
  address = WALLET_ADDRESS,
  currencyAddress = MINT_USDC
}: UseFindMarketplaceProps) => {
  const { data, refetch, status } = useQuery({
    queryKey: ['marketplace', address],
    queryFn: async () => {
      const url = new URL('/sol/v1/marketplace/my_markets', SHYFT_API_URL);
      url.searchParams.append('network', network);
      // url.searchParams.append('creator_address', address);
      // url.searchParams.append('currency_address', currencyAddress);
      console.log('SHYFT_API_URL', url.toString(), window.ENV.SHYFT_API_KEY)
      try {
        const res = await axios.get(url.toString(), {
          headers: {
            'x-api-key': window.ENV.SHYFT_API_KEY,
            'Access-Control-Allow-Origin': '*',
          },
        })
        console.warn('UseFindMarketplaceProps', res.data)
        return res.data
      } catch (error) {
        return null
      }
    },
    enabled: !!address && canUseDOM,
    retry: true,
    retryDelay: (attemptIndex: number) =>
      Math.min(800 * 2 ** attemptIndex, 5000),
    refetchIntervalInBackground: true,
  });

  return {
    status,
    data,
    refetch,
  };
};
