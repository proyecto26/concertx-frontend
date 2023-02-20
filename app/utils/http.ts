import isEmpty from 'lodash/isEmpty';
import { getAccessTokenOrRedirect } from './auth.server';

const DEFAULT_TIMEOUT = 4000;

export type HttpOptions = RequestInit & {
  timeout?: number;
  defaultResponse?: unknown
}

async function httpRequest(
  resource: string,
  options: HttpOptions = { timeout: DEFAULT_TIMEOUT },
) {
  const { timeout, ...rest } = options;
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout || DEFAULT_TIMEOUT);
  try {
    const response = await fetch(resource, {
      ...rest,
      headers,
      signal: controller.signal
    });
    clearTimeout(id);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const message = await response.text();
    return isEmpty(message) ? null : JSON.parse(message);
  } catch (error) {
    if (rest.defaultResponse !== undefined) {
      return rest.defaultResponse;
    }
    if (controller.signal.aborted) {
      throw new Error(`Server has not responded in ${timeout} ms`)
    }
    throw error;
  }
}

async function authRequest(
  request: Request,
  resource: string,
  options: HttpOptions = { timeout: DEFAULT_TIMEOUT },
): Promise<any> {
  const accessToken = await getAccessTokenOrRedirect(request);
  const headers = new Headers(options.headers);
  if (!headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  options.headers = headers;
  return await httpRequest(resource, options);
}

export { httpRequest, authRequest };
