import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { SHYFT_API_URL } from '~/constants';
import { canUseDOM } from '~/utils/dom';

export type UseGetAllNFTsProps = {
  address: string;
};

export const useGetAllNFTs = ({ address }: UseGetAllNFTsProps) => {
  const { data, refetch, status } = useQuery({
    queryKey: ['nft_read_all', address],
    queryFn: async () => {
      const url = new URL('/sol/v1/nft/read_all', SHYFT_API_URL);
      url.searchParams.append('network', 'mainnet-beta');
      url.searchParams.append('address', address);
      const res = await axios.get(url.toString(), {
        headers: {
          'x-api-key': window.ENV.SHYFT_API_KEY,
        },
      })
      return res.data
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
