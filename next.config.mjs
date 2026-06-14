/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ── URL consistency ── */
  trailingSlash: true,

  /* ── Remove X-Powered-By header (information leakage) ── */
  poweredByHeader: false,

  /* ── Image optimization ── */
  images: {
    formats: ['image/webp'],
  },

  /* ── Dev origins ── */
  allowedDevOrigins: ['https://wise-lion.slim.show'],

  /* ── Redirects ── */
  async redirects() {
    return [
      {
        source: '/developer',
        destination: 'https://divyakush2006.github.io/divyakush-resume/',
        permanent: true,
      },
    ];
  },

  /* ── Enterprise-grade security headers (cross-browser) ── */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          /* Prevent MIME-type sniffing — all browsers */
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          /* Clickjacking protection — legacy browsers use X-Frame-Options,
             modern browsers use CSP frame-ancestors */
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          /* Control referrer information sent to other origins */
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          /* XSS protection for older browsers (IE/Edge legacy) */
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          /* Force HTTPS for 1 year, include subdomains, eligible for HSTS preload */
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          /* Restrict browser features / APIs */
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          /* DNS prefetch control */
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          /* Developer credit — visible in browser DevTools, crawled by bots */
          {
            key: 'X-Credits',
            value: 'Divyakush Punjabi - https://divyakush2006.github.io/divyakush-resume/',
          },
        ],
      },
    ];
  },
};

export default nextConfig;