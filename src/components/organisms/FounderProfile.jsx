'use client';
import { tokens } from '@/theme/tokens';
import { Container } from '@/components/atoms/Container';
import { Icon } from '@/components/atoms/Icon';
import { experiences } from '@/config/founder';
import Image from 'next/image';
export function FounderProfile() {
  return (
    <Container style={{ paddingTop: '52px', paddingBottom: '52px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2
          style={{
            fontFamily: tokens?.fonts?.display || 'inherit',
            fontSize: 'clamp(26px, 4vw, 38px)',
            fontWeight: 800,
            color: tokens.onSurface,
            marginBottom: '12px',
            letterSpacing: '-0.03em',
          }}
        >
          <br />
          Meet the <span style={{ color: tokens.primary }}>Founder</span>
        </h2>
        <p
          style={{
            fontSize: 'clamp(13px, 1.6vw, 15px)',
            color: tokens.secondary,
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          <span style={{ color: '#FF3B30', fontWeight: 600 }}>TEDx</span> Speaker & PhD in Responsible AI Governance
        </p>
      </div>

      <div
        className="responsive-flex"
        style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}
      >
        {/* Left Column: Image & Highlights */}
        <div
          style={{ flex: '1', position: 'sticky', top: '80px' }}
          className="mobile-w-full mobile-mb-sm"
        >
          <div
            style={{
              position: 'relative',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
              background: tokens.surface,
              marginBottom: '14px',
            }}
          >
            <Image
              src="/assets/img/founder.png"
              alt="Parishrut Jassal - Founder of GovernAI"
              width={500}
              height={600}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                padding: '22px',
                color: '#fff',
              }}
            >
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  marginBottom: '3px',
                }}
              >
                Parishrut Jassal
              </h3>
              <p style={{ fontSize: '13px', opacity: 0.9, fontWeight: 500 }}>
                AI Policy & Governance Leader
              </p>
            </div>
          </div>

            <a
            href="https://linkedin.com/in/parishrut-jassal"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#0077b5',
              color: '#fff',
              padding: '12px 20px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 119, 181, 0.2)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#005e8e')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#0077b5')}
          >
            <Icon name="link" size={16} /> Connect on LinkedIn
          </a>
        </div>

        {/* Right Column: Experience Timeline / Roadmap */}
        <div
          style={{ flex: '1.5', display: 'flex', flexDirection: 'column' }}
          className="mobile-w-full"
        >
          {experiences.map((exp, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '18px',
                paddingBottom: i !== experiences.length - 1 ? '28px' : '0',
              }}
            >
              {/* Roadmap Graphic Column */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '16px',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: '2px',
                    height: '28px',
                    background: i === 0 ? 'transparent' : tokens.primary,
                    opacity: 0.3,
                  }}
                />
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: tokens.surface,
                    border: `3px solid ${tokens.primary}`,
                    zIndex: 2,
                    flexShrink: 0,
                    boxShadow: `0 0 0 4px rgba(0,0,0,0.03)`,
                  }}
                />
                <div
                  style={{
                    width: '2px',
                    flexGrow: 1,
                    background:
                      i !== experiences.length - 1
                        ? tokens.primary
                        : 'transparent',
                    opacity: 0.3,
                  }}
                />
              </div>

              {/* Content Card */}
              <div
                style={{
                  flex: '1',
                  background: tokens.surface,
                  padding: '22px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 26px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 18px rgba(0,0,0,0.06)';
                }}
              >
                <h4
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: tokens.onSurface,
                    marginBottom: '4px',
                  }}
                >
                  {exp.role}
                </h4>
                <div
                  style={{
                    fontSize: '13px',
                    color: tokens.primary,
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}
                >
                  {exp.org}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    color: tokens.secondary,
                    marginBottom: '10px',
                    fontWeight: 500,
                  }}
                >
                  <Icon name="history" size={12} />
                  {exp.duration}
                </div>

                <p
                  style={{
                    fontSize: '13px',
                    color: tokens.secondary,
                    lineHeight: 1.55,
                    marginBottom: exp.skills ? '10px' : '0',
                  }}
                >
                  {exp.desc}
                </p>

                {exp.skills && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginTop: '10px',
                    }}
                  >
                    {exp.skills.split(', ').map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          background: 'rgba(0,0,0,0.05)',
                          color: tokens.onSurface,
                          padding: '3px 8px',
                          borderRadius: '100px',
                          fontWeight: 600,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}