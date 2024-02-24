function getRequiredEnvVarFromObj<T>(
  obj: Record<string, string | undefined>,
  key: string,
  devValue: unknown = `${key}-dev-value`
) {
  let value = devValue;
  const envVal = obj[key];
  if (envVal) {
    value = envVal;
  } else if (obj.ENVIRONMENT !== 'local') {
    throw new Error(`${key} is a required env variable`);
  }
  return value as T;
}

function getRequiredServerEnvVar<T = string>(key: string, devValue?: unknown) {
  return getRequiredEnvVarFromObj<T>(process.env, key, devValue);
}

export const walletNetwork = getRequiredServerEnvVar('WALLET_NETWORK');
export const shyftApiKey = getRequiredServerEnvVar('SHYFT_API_KEY');
