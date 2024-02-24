import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { SHYFT_API_URL } from '~/constants';
import { queryClient } from '~/utils/query';

export type UseListNFT = {
  network: string;
  marketplaceAddress: string;
  sellerWallet: string;
};

export type ListNFT = {
  nftAddress: string;
  price: number;
}

export const useListNFT = ({
  network,
  marketplaceAddress,
  sellerWallet,
}: UseListNFT) => {
  const { status, mutate } = useMutation({
    mutationFn: ({ price, nftAddress }: ListNFT) => {
      const url = new URL('/sol/v1/marketplace/list', SHYFT_API_URL);
      return axios.post(url.toString(), {
        network,
        nft_address: nftAddress,
        marketplace_address: marketplaceAddress,
        price: price,
        seller_wallet: sellerWallet,
      }, {
        headers: {
          'x-api-key': window.ENV.SHYFT_API_KEY,
        },
      })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['marketplace_list', marketplaceAddress] }),
  })

  return {
    status,
    listNFT: mutate,
  };
};
