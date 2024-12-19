import { shyftApiKey, supabaseKey, walletNetwork } from '~/config/env.server';

export function getEnv() {
  return {
    WALLET_NETWORK: walletNetwork,
    SHYFT_API_KEY: shyftApiKey,
    SUPABASE_KEY: supabaseKey,
  };
}


export type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ReturnType<typeof getEnv>;
  interface window {
    ENV: ENV;
  }
}
