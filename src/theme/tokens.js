export const tokens = {
  // ── Brand Colors ──
  primary: '#ea6926',
  primaryHover: '#d45a1a',
  primaryGrad: 'linear-gradient(135deg, #ea6926 0%, #ff8c42 100%)',
  primaryFixed: '#ffe5d6',
  onPrimary: '#ffffff',

  // ── Peach Palette ──
  peach50: '#FFF8F3',
  peach100: '#FFF0E6',
  peach200: '#FFDDC1',
  peach300: '#FFC8A0',

  // ── Surfaces ──
  surface: '#f7f9fb',
  surfaceLow: '#f2f4f6',
  surfaceContainer: '#eceef0',
  surfaceLowest: '#ffffff',
  surfaceCard: '#ffffff',
  background: '#f7f9fb',

  // ── Text ──
  onSurface: '#191c1e',
  onBackground: '#0f0f11',
  secondary: '#515f74',
  textMuted: '#8494a7',

  // ── Feedback ──
  error: '#ba1a1a',
  errorContainer: '#ffdad6',

  // ── Borders ──
  outlineVariant: '#f0c8a0',
  borderSubtle: 'rgba(0,0,0,0.07)',
  borderLight: 'rgba(0,0,0,0.04)',

  // ── Typography ──
  fonts: {
    display: "'Plus Jakarta Sans', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  // ── Spacing Scale ──
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },

  // ── Radius Scale ──
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    full: '9999px',
  },

  // ── Elevation (multi-layered shadows) ──
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    md: '0 2px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
    lg: '0 4px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.06)',
    xl: '0 8px 16px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.12), 0 24px 64px rgba(0,0,0,0.08)',
    glow: '0 8px 32px rgba(234, 105, 38, 0.25), 0 4px 12px rgba(0,0,0,0.08)',
    cardHover: '0 12px 32px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06)',
  },

  // ── Transitions ──
  transition: {
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    premium: '0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
    bounce: '0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  },
};
