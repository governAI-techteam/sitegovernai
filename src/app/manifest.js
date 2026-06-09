import { SITE } from '@/config/seo';

export default function manifest() {
  return {
    name: `${SITE.name} — Governing Artificial Intelligence`,
    short_name: SITE.name,
    description:
      'GovernAI provides the architectural framework to deploy, monitor, and scale AI systems with absolute compliance and zero bias.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f9fb',
    theme_color: '#f16a24',
    icons: [
      {
        src: '/assets/img/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/assets/img/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
