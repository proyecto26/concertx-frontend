import { shyftApiKey, walletNetwork } from '~/utils/misc.server';

export function getEnv() {
  return {
    WALLET_NETWORK: walletNetwork,
    SHYFT_API_KEY: shyftApiKey,
  };
}


export type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ReturnType<typeof getEnv>;
  interface window {
    ENV: ENV;
  }
}
