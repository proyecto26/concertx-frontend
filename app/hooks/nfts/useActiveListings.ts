import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { SHYFT_API_URL } from '~/constants';
import { canUseDOM } from '~/utils/dom';

export type UseActiveListings = {
  network: string;
  marketplaceAddress: string;
};

export const useActiveListings = ({ network, marketplaceAddress }: UseActiveListings) => {
  const { data, refetch, status } = useQuery({
    queryKey: ['marketplace_list', marketplaceAddress],
    queryFn: async () => {
      const url = new URL('/sol/v1/marketplace/active_listings', SHYFT_API_URL);
      url.searchParams.append('network', network);
      url.searchParams.append('marketplace_address', marketplaceAddress);
      const res = await axios.get(url.toString(), {
        headers: {
          'x-api-key': window.ENV.SHYFT_API_KEY,
        },
      })
      return res.data
    },
    enabled: !!marketplaceAddress && canUseDOM,
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
