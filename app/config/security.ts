const localDomains = process.env.NODE_ENV === 'development' ? '127.0.0.1:* localhost:* ws://localhost:*' : '';
const domains = 'https://*.concertx.com https://*.githubusercontent.com';
const envDomains = [domains, localDomains].filter(Boolean).join(' ');

export const ContentSecurityPolicy = `
  default-src 'self' data: blob:;
  script-src 'self' 'unsafe-inline' data: blob: ${envDomains};
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://rsms.me;
  object-src 'none';
  base-uri 'self';
  connect-src 'self' ${envDomains} ;
  font-src 'self' data: https://rsms.me https://fonts.gstatic.com;
  frame-src 'self';
  img-src 'self' data: blob: ${domains};
  manifest-src 'self';
  media-src 'self' blob: ${domains};
  worker-src 'self' blob:;
  form-action 'self';
`;

export const securityHeaders: Record<string, string> = {
  // X-DNS-Prefetch-Control
  'X-DNS-Prefetch-Control': 'on',
  // Strict-Transport-Security
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  // X-XSS-Protection
  'X-XSS-Protection': '1; mode=block',
  // X-Frame-Options
  'X-Frame-Options': 'SAMEORIGIN',
  // X-Content-Type-Options
  'X-Content-Type-Options': 'nosniff',
  // Referrer-Policy
  'Referrer-Policy': 'origin-when-cross-origin',
  // Content Security Policy
  'Content-Security-Policy': ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
};
