// import { apiUrl } from '~/utils/misc.server';

export function getEnv() {
  return {
    // API_URL: apiUrl,
  };
};


export type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ReturnType<typeof getEnv>;
  interface window {
    ENV: ENV;
  }
}
