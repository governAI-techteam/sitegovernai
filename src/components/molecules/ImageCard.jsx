'use client';
import { tokens } from '@/theme/tokens';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/atoms/FadeIn';
import { Icon } from '@/components/atoms/Icon';
import Image from 'next/image';

/* ───────────────────────── Data ───────────────────────── */

const founder = {
  name: 'Parishrut Jassal',
  role: 'Founder & Chief Executive Officer',
  image: '/assets/img/founder.png',
  linkedin: 'https://linkedin.com/in/parishrut-jassal',
  highlights: [
    'TEDx Speaker · UKAS-recognised ISO/IEC 42001 Auditor',
    'Working Group Member on AI & Digital Governance, Government of Himachal Pradesh',
    'Former Deputy Advisor, NIEPA, Ministry of Education · Expert Member, India–UNESCO AI Readiness Assessment',
    'AI Safety Governance Fellow · Doctoral Researcher on the Global Governance of AI for Sustainable Peace',
    'Member of ForHumanity (USA) on AI Audits & Regulation',
  ],
};

const teamMembers = [
  {
    name: 'Alvin Antony',
    role: 'Chief Compliance Officer',
    image: '/assets/img/senior-2.png',
    description:
      'AI & Frontier Tech Lawyer | AI Governance, ISO 42001, IP & Data Protection | Certified Implementer/Auditor in ISO 42001:2023 and ISO 9001:2015.',
  },
  {
    name: 'Dr. Utso Guha Roy',
    role: 'AI & Healthcare Lead',
    image: '/assets/img/senior-1.png',
    description:
      'MD in Pathology (2018), Certified in AI Medicine (CCAIM), Post-Doctoral in Digital Pathology.',
  },
  {
    name: 'Anubhav Sharma',
    role: 'DevSecOps Lead',
    image: '/assets/img/anubhav.jpeg',
    description:
      'Experienced in infrastructure automation, containerized environments, and secure system design. Focused on building scalable, resilient, and security-first platform foundations.',
  },
  {
    name: 'Aditya Udiya',
    role: 'Applied AI Engineer',
    image: '/assets/img/aditya2.jpeg',
    description:
      'AI product builder with 24+ applied AI solutions. Startup founder. Ex Research Intern at IIT BHU in AI and ML. National level winner in Software Systems. 6x hackathon winner.',
  },
  {
    name: 'Dr. Rutva Tanna',
    role: 'AI & Healthcare Intern',
    image: '/assets/img/rutva.jpeg',
    description:
      'BHMS professional focused on holistic wellness and patient-centered care. Bridging healthcare knowledge with AI-driven solutions for better clinical outcomes.',
  },
];

const advisor = {
  name: 'Dr. Murthy Remilla',
  role: 'Chief Advisor',
  image: '/assets/img/advisor.png',
  highlights: [
    'Former Senior Scientist at ISRO',
    'Head of Project Management for Gaganyaan',
    '35+ years in technical & leadership roles',
  ],
};

/* ───────────────────────── Team Card (unchanged design) ───────────────────────── */

function MemberCard({ member, index }) {
  return (
    <FadeIn
      delay={0.05 + index * 0.1}
      yOffset={30}
      className="team-member-card"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 22px 26px',
        background: 'linear-gradient(165deg, #fffdfb 0%, #fffaf6 100%)',
        border: '1px solid rgba(234,105,38,0.1)',
        borderRadius: '20px',
        boxShadow:
          '0 1px 2px rgba(234,105,38,0.04), 0 10px 28px rgba(16,24,40,0.05)',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease',
        cursor: 'default',
        textAlign: 'center',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow =
          '0 4px 8px rgba(234,105,38,0.06), 0 22px 48px rgba(234,105,38,0.14)';
        e.currentTarget.style.borderColor = 'rgba(234,105,38,0.22)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow =
          '0 1px 2px rgba(234,105,38,0.04), 0 10px 28px rgba(16,24,40,0.05)';
        e.currentTarget.style.borderColor = 'rgba(234,105,38,0.1)';
      }}
    >
      {/* top accent bar */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '44px',
          height: '4px',
          borderRadius: '0 0 6px 6px',
          background: 'linear-gradient(90deg, #ea6926, #ff8c42)',
        }}
      />

      {/* portrait with gradient ring */}
      <div
        style={{
          width: '112px',
          height: '112px',
          borderRadius: '50%',
          padding: '3px',
          background: 'linear-gradient(135deg, #ea6926 0%, #ff8c42 100%)',
          marginBottom: '18px',
          flexShrink: 0,
          boxShadow: '0 8px 20px rgba(234,105,38,0.22)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #fff',
            background: '#fff',
          }}
        >
          <Image
            src={member.image}
            alt={member.name}
            width={112}
            height={112}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      <h6
        style={{
          fontFamily: tokens.fonts.display,
          fontSize: '17px',
          fontWeight: 800,
          color: tokens.onSurface,
          marginBottom: '5px',
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
        }}
      >
        {member.name}
      </h6>
      <p
        style={{
          fontSize: '11px',
          color: tokens.primary,
          fontWeight: 700,
          marginBottom: '14px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {member.role}
      </p>

      {/* divider */}
      <span
        aria-hidden="true"
        style={{
          width: '36px',
          height: '1px',
          background: 'rgba(234,105,38,0.25)',
          marginBottom: '14px',
        }}
      />

      <div
        style={{
          fontSize: '12.5px',
          color: tokens.secondary,
          lineHeight: 1.6,
        }}
      >
        {member.description}
      </div>
    </FadeIn>
  );
}

/* ───────────────────────── Premium Feature Card (Founder & Advisor) ───────────────────────── */

function FeatureCard({ person, eyebrow, reverse = false, delay = 0, accent = 'founder' }) {
  // Seniority-based top accent bar
  const accentStyles = {
    founder: {
      height: '6px',
      background: 'linear-gradient(90deg, #ea6926 0%, #ff8c42 50%, #ea6926 100%)',
      opacity: 1,
    },
    advisor: {
      height: '5px',
      background: 'linear-gradient(90deg, #ea6926 0%, #ffb985 100%)',
      opacity: 0.92,
    },
  };
  const bar = accentStyles[accent] || accentStyles.founder;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="feature-card"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
        gap: 'clamp(24px, 4vw, 56px)',
        alignItems: 'stretch',
        background: 'linear-gradient(165deg, #fffdfb 0%, #fffaf6 100%)',
        border: '1px solid rgba(234,105,38,0.1)',
        borderRadius: '28px',
        padding: 'clamp(20px, 3vw, 40px)',
        boxShadow:
          '0 1px 2px rgba(234,105,38,0.04), 0 12px 32px rgba(234,105,38,0.06), 0 28px 64px rgba(16,24,40,0.05)',
        overflow: 'hidden',
      }}
    >
      {/* Seniority accent bar (top edge, full width) */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: bar.height,
          background: bar.background,
          opacity: bar.opacity,
        }}
      />

      {/* Portrait */}
      <div
        className="feature-portrait"
        style={{
          position: 'relative',
          flex: '0 0 clamp(180px, 22vw, 300px)',
          borderRadius: '20px',
          overflow: 'hidden',
          minHeight: '300px',
          background: tokens.surfaceContainer,
          boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
        }}
      >
        <Image
          src={person.image}
          alt={person.name}
          width={400}
          height={480}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
          }}
        />
        {/* bottom gradient with name */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(15,15,17,0.85) 0%, rgba(15,15,17,0.15) 38%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '20px',
            color: '#fff',
          }}
        >
          <h3
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: 'clamp(18px, 1.8vw, 22px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            {person.name}
          </h3>
          <p
            style={{
              fontSize: '12.5px',
              fontWeight: 600,
              opacity: 0.92,
              margin: '4px 0 0',
              letterSpacing: '0.01em',
            }}
          >
            {person.role}
          </p>
        </div>
      </div>

      {/* Details */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: 0,
        }}
      >
        {eyebrow && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              alignSelf: 'flex-start',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: tokens.primary,
              background: 'rgba(234,105,38,0.07)',
              border: '1px solid rgba(234,105,38,0.18)',
              padding: '6px 14px',
              borderRadius: '999px',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: tokens.primary,
              }}
            />
            {eyebrow}
          </span>
        )}

        <h3
          className="hide-on-mobile"
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: 'clamp(22px, 2.6vw, 32px)',
            fontWeight: 800,
            color: tokens.onSurface,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: '0 0 4px',
          }}
        >
          {person.name}
        </h3>
        <p
          className="hide-on-mobile"
          style={{
            fontSize: 'clamp(13px, 1.2vw, 15px)',
            fontWeight: 600,
            color: tokens.primary,
            margin: '0 0 18px',
            letterSpacing: '0.01em',
          }}
        >
          {person.role}
        </p>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {person.highlights.map((h, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                fontSize: 'clamp(13px, 1.05vw, 14.5px)',
                lineHeight: 1.55,
                color: '#4a3f38',
                fontWeight: 500,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0, marginTop: '1px' }}
              >
                <circle cx="12" cy="12" r="11" fill="#fff" stroke="rgba(234,105,38,0.25)" strokeWidth="1" />
                <path
                  d="m8 12 2.5 2.5L16 9"
                  stroke="#ea6926"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              alignSelf: 'flex-start',
              marginTop: '24px',
              background: 'linear-gradient(135deg, #191c1e 0%, #2d3133 100%)',
              color: '#fff',
              padding: '11px 22px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '13.5px',
              fontFamily: tokens.fonts.display,
              textDecoration: 'none',
              letterSpacing: '0.01em',
              boxShadow: '0 6px 18px rgba(0,0,0,0.22)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 26px rgba(0,0,0,0.28)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.22)';
            }}
          >
            <Icon name="link" size={16} /> Connect on LinkedIn
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ───────────────────────── Division Label ───────────────────────── */

function DivisionLabel({ children }) {
  return (
    <FadeIn yOffset={20} style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h3
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: 'clamp(18px, 2vw, 24px)',
            fontWeight: 800,
            color: tokens.onSurface,
            letterSpacing: '-0.02em',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {children}
        </h3>
        <span
          style={{
            flex: 1,
            height: 1,
            background:
              'linear-gradient(90deg, rgba(234,105,38,0.35), rgba(234,105,38,0.04))',
          }}
        />
      </div>
    </FadeIn>
  );
}

/* ───────────────────────── Section ───────────────────────── */

function ImageCard() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .feature-card { flex-direction: column !important; }
          .feature-portrait { min-height: 320px !important; }
        }

        /* 6-col grid: 3 cards per row (each spans 2 cols) */
        .team-grid > * { grid-column: span 2; }
        /* Center the orphan row (last 2 of 5) */
        .team-grid > *:nth-child(4) { grid-column: 2 / span 2; }
        .team-grid > *:nth-child(5) { grid-column: 4 / span 2; }

        @media (max-width: 900px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .team-grid > *,
          .team-grid > *:nth-child(4),
          .team-grid > *:nth-child(5) {
            grid-column: auto !important;
          }
        }
        @media (max-width: 560px) {
          .team-grid { grid-template-columns: 1fr !important; }
          .team-grid > * { grid-column: auto !important; }
        }
      `}</style>

      <div
        style={{
          paddingTop: 'clamp(72px, 8vw, 120px)',
          paddingBottom: 'clamp(72px, 8vw, 120px)',
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        {/* Single Title */}
        <FadeIn delay={0.1} yOffset={30} style={{ textAlign: 'center', marginBottom: 'clamp(36px, 4vw, 56px)' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: tokens.primary,
              background: 'rgba(234,105,38,0.07)',
              border: '1px solid rgba(234,105,38,0.18)',
              padding: '6px 16px',
              borderRadius: '999px',
              marginBottom: '16px',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: tokens.primary }} />
            People
          </span>
          <h2
            style={{
              fontFamily: tokens?.fonts?.display || 'inherit',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: tokens.onSurface,
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              margin: '0 0 14px',
            }}
          >
            Meet Our <span style={{ color: tokens.primary }}>Team</span>
          </h2>
          <p
            style={{
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              color: tokens.secondary,
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            A multidisciplinary team of governance experts, technologists, and
            researchers building the future of responsible AI.
          </p>
        </FadeIn>

        {/* ── Founder ── */}
        <DivisionLabel>Founder</DivisionLabel>
        <div style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <FeatureCard person={founder} accent="founder" />
        </div>

        {/* ── Team ── */}
        <DivisionLabel>Team</DivisionLabel>
        <div
          className="team-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 'clamp(20px, 2vw, 28px)',
            marginBottom: 'clamp(48px, 6vw, 72px)',
          }}
        >
          {teamMembers.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* ── Advisors ── */}
        <DivisionLabel>Advisors</DivisionLabel>
        <FeatureCard person={advisor} accent="advisor" reverse delay={0.1} />
      </div>
    </>
  );
}

export default ImageCard;
