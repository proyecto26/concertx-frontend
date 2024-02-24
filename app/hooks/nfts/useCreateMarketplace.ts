import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { MINT_USDC, SHYFT_API_URL, WALLET_ADDRESS } from '~/constants';
import { queryClient } from '~/utils/query';

export type UseCreateMarketplace = {
  network: string;
  transactionFee?: number;
  creatorWallet?: string;
  currencyAddress?: string;
};

export const useCreateMarketplace = ({
  network,
  transactionFee = 10,
  creatorWallet = WALLET_ADDRESS,
  currencyAddress = MINT_USDC
}: UseCreateMarketplace) => {
  const { status, mutate } = useMutation({
    mutationFn: () => {
      const url = new URL('/sol/v1/marketplace/create', SHYFT_API_URL);
      return axios.post(url.toString(), {
        network,
        transaction_fee: transactionFee,
        creator_wallet: creatorWallet,
        currency_address: currencyAddress
      }, {
        headers: {
          'x-api-key': window.ENV.SHYFT_API_KEY,
        },
      })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['marketplace', creatorWallet] }),
  })

  return {
    status,
    create: mutate,
  };
};
