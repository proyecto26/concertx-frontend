function getRequiredEnvVarFromObj<T>(
  obj: Record<string, string | undefined>,
  key: string,
  devValue: unknown = `${key}-dev-value`
) {
  let value = devValue;
  const envVal = obj[key];
  if (envVal) {
    value = envVal;
  } else if (obj.NODE_ENV !== 'development') {
    throw new Error(`${key} is a required env variable - ${obj.NODE_ENV}`);
  }
  return value as T;
}

function getRequiredServerEnvVar<T = string>(key: string, devValue?: unknown) {
  return getRequiredEnvVarFromObj<T>(process.env, key, devValue);
}

export const cacheKey = 'webapp';
export const sessionSecret = getRequiredServerEnvVar('SESSION_SECRET', 'SECRET_KEY');