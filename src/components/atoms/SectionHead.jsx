import { tokens } from '@/theme/tokens';



export function SectionHead({
  eyebrow,
  title,
  accent,
  align = 'left',
  children,
  style = {},
}) {
  return (
    <div style={{ textAlign: align, marginBottom: 56, ...style }}>
      {eyebrow && (
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: tokens.primary,
            marginBottom: 12,
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        style={{
          fontFamily: tokens.fonts.display,
          fontSize: 'clamp(26px,3vw,40px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.15,
          color: tokens.onSurface,
          marginBottom: children ? 12 : 0,
        }}
      >
        {title}
        {accent && <span style={{ color: tokens.primary }}> {accent}</span>}
      </h2>
      {children && (
        <p style={{ color: tokens.secondary, fontSize: 16, lineHeight: 1.7 }}>
          {children}
        </p>
      )}
    </div>
  );
}
