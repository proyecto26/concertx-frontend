import type { CookieParseOptions, CookieSerializeOptions } from 'cookie';
import { parse, serialize } from 'cookie';
import type { CreateCookieFunction } from '@remix-run/server-runtime';
import isEmpty from 'lodash/isEmpty';

export type { CookieParseOptions, CookieSerializeOptions };

/**
 * Creates a logical container for managing a browser cookie from the server.
 *
 * @see https://github.com/remix-run/remix/issues/158
 */
function createCookieFactory(): CreateCookieFunction {
  return (name, cookieOptions = {}) => {
    const { secrets, ...options } = {
      secrets: [],
      path: '/',
      ...cookieOptions,
    };

    return {
      get name() {
        return name;
      },
      get isSigned() {
        return secrets.length > 0;
      },
      get expires() {
        // Max-Age takes precedence over Expires
        return typeof options.maxAge !== 'undefined'
          ? new Date(Date.now() + options.maxAge * 1000)
          : options.expires;
      },
      async parse(cookieHeader, parseOptions) {
        if (!cookieHeader) return null;
        let cookies = parse(cookieHeader, { ...options, ...parseOptions });
        if (name in cookies) {
          const cookie = cookies[name];
          if (isEmpty(cookie)) {
            return '';
          }
          try {
            const value = JSON.parse(cookie);
            return value;
          } catch {
            return cookie;
          }
        }
        return null;
      },
      async serialize(value, serializeOptions) {
        return serialize(name, value, {
          ...options,
          ...serializeOptions,
        });
      },
    };
  };
}

const createForeignCookie = createCookieFactory();

export default createForeignCookie;