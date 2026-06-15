/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ── Static export for Netlify deployment ── */
  output: 'export',

  /* ── URL consistency ── */
  trailingSlash: true,

  /* ── Remove X-Powered-By header (information leakage) ── */
  poweredByHeader: false,

  /* ── Image optimization ── */
  images: {
    formats: ['image/webp'],
    unoptimized: true,
  },

  /* ── Dev origins ── */
  allowedDevOrigins: ['https://wise-lion.slim.show'],
};

export default nextConfig;