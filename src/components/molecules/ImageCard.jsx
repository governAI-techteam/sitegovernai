'use client';
import { useState } from 'react';
import { tokens } from '@/theme/tokens';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/atoms/FadeIn';
import { Icon } from '@/components/atoms/Icon';
import Image from 'next/image';

/* ───────────────────────── Data ───────────────────────── */

const founder = {
  name: 'Parishrut Jassal',
  role: 'Founder & Chief Executive Officer',
  image: '/assets/img/founder/founder.jpg',
  linkedin: 'https://linkedin.com/in/parishrut-jassal',
  highlights: [
    'TEDx Speaker · UKAS-recognised ISO/IEC 42001 Auditor',
    'Working Group Member on AI & Digital Governance, Government of Himachal Pradesh',
    'Former Deputy Advisor, NIEPA, Ministry of Education · Expert Member, India–UNESCO AI Readiness Assessment',
    'AI Safety Governance Fellow · Doctoral Researcher on the Global Governance of AI for Sustainable Peace',
    'Member of ForHumanity (USA) on AI Audits & Regulation',
  ],
};

const FALLBACK_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='112' viewBox='0 0 112 112'%3E%3Crect width='112' height='112' fill='%23f5f0eb' rx='56'/%3E%3Cpath d='M56 46c-7.7 0-14-6.3-14-14s6.3-14 14-14 14 6.3 14 14-6.3 14-14 14zm0 4c-12.2 0-22 6.7-22 15v11h44V65c0-8.3-9.8-15-22-15z' fill='%23c4b8ae'/%3E%3C/svg%3E";

const teamMembers = [
  {
    name: 'Adv. Alvin Antony',
    role: 'Chief Compliance Officer',
    image: '/assets/img/Team/team_alvin.jpeg',
    linkedin: 'https://linkedin.com/in/alvin-antony',
    description:
      'Certified AI Auditor (ISO 42001) with CAIQ, CACP, DCDPO, and DCPLA certifications. Brings extensive expertise in AI governance, compliance frameworks, risk management, and regulatory standards for responsible AI implementation.',
  },
  {
    name: 'Dr. Utso Guha Roy',
    role: 'AI & Healthcare Lead',
    image: '/assets/img/Team/team_utso.png',
    linkedin: 'https://linkedin.com/in/utso-guha-roy',
    description:
      'Clinical AI specialist leading healthcare verification initiatives, AI-driven healthcare solutions, and curriculum development. Focused on bridging advanced artificial intelligence with real-world healthcare applications and innovation.',
  },
  {
    name: 'Anubhav Sharma',
    role: 'Technical & Security Lead',
    image: '/assets/img/Team/team_anubhav.jpeg',
    linkedin: 'https://linkedin.com/in/anubhav-sharma',
    description:
      'Information security architect specializing in security methodologies, compliance frameworks, risk assessment, and Tier 2 and Tier 3 audit engagements. Leads the organization\'s technical infrastructure and cybersecurity initiatives.',
  },
  {
    name: 'Dr. Himanshu Kalia',
    role: 'AI & Healthcare Consultant',
    image: '/assets/img/Team/team_himanshu.jpeg',
    linkedin: 'https://linkedin.com/in/himanshu-kalia',
    description:
      'Scientific Officer at IIT DRISHTI CPS with an MSc from the University of Glasgow. Contributes expertise in healthcare research, scientific innovation, artificial intelligence applications, and interdisciplinary technology development.',
  },
  {
    name: 'Saranshi Gupta',
    role: 'Growth & Strategy Lead',
    image: '/assets/img/Team/saranshi.png',
    linkedin: 'https://linkedin.com/in/saranshi-gupta',
    description:
      'MBA from S. P. Jain School of Global Management with expertise in partnerships, business development, strategic growth initiatives, and go-to-market execution. Drives organizational expansion and ecosystem development.',
  },
  {
    name: 'Er. Preekshit Singh',
    role: 'Operations & Training Lead',
    image: '/assets/img/Team/team_preekshit.png',
    linkedin: 'https://linkedin.com/in/preekshit-singh',
    description:
      'Civil engineer overseeing academy operations, training delivery, process optimization, and organizational execution. Responsible for ensuring efficient program management and operational excellence across initiatives.',
  },
];

const advisors = [
  {
    name: 'Dr. Murthy Remilla',
    role: 'President, Telemedicine Society of India',
    image: '/assets/img/team_murthy.png',
    linkedin: 'https://linkedin.com/in/murthy-remilla',
    description:
      'Former ISRO Scientist and a recognized leader in healthcare technology and digital transformation. Advises on AI governance, healthcare innovation, telemedicine adoption, and responsible implementation of emerging technologies in healthcare delivery systems.',
  },
  {
    name: 'Maya Sherman',
    role: 'International AI Policy Advisor',
    image: '/assets/img/team_maya.jpeg',
    linkedin: 'https://linkedin.com/in/maya-sherman',
    description:
      'Former Science, Technology, and Innovation Attaché at the Embassy of Israel. Associated with global policy and research initiatives including GPAI, OECD, and Oxford. Provides strategic guidance on AI governance, international policy frameworks, and responsible AI development.',
  },
  {
    name: 'Arun Pandit',
    role: 'Industry Advisor',
    image: '/assets/img/team_arun.png',
    linkedin: 'https://linkedin.com/in/arun-pandit',
    description:
      'Co-Founder of Hyphen SCS, Chairman of AIMA Young Leaders Council, and TEDx Speaker. Brings extensive experience in entrepreneurship, leadership development, business strategy, innovation, and industry partnerships.',
  },
];

/* ───────────────────────── Team Card (unchanged design) ───────────────────────── */

function MemberCard({ member, index }) {
  const [imgSrc, setImgSrc] = useState(member.image);
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
        border: '1px solid rgba(241,106,36,0.1)',
        borderRadius: '20px',
        boxShadow:
          '0 1px 2px rgba(241,106,36,0.04), 0 10px 28px rgba(16,24,40,0.05)',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease',
        cursor: 'default',
        textAlign: 'center',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow =
          '0 4px 8px rgba(241,106,36,0.06), 0 22px 48px rgba(241,106,36,0.14)';
        e.currentTarget.style.borderColor = 'rgba(241,106,36,0.22)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow =
          '0 1px 2px rgba(241,106,36,0.04), 0 10px 28px rgba(16,24,40,0.05)';
        e.currentTarget.style.borderColor = 'rgba(241,106,36,0.1)';
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
          background: 'linear-gradient(90deg, #f16a24, #f16a24)',
        }}
      />

      {/* portrait with gradient ring */}
      <div
        style={{
          width: '112px',
          height: '112px',
          borderRadius: '50%',
          padding: '3px',
          background: 'linear-gradient(135deg, #f16a24 0%, #f16a24 100%)',
          marginBottom: '18px',
          flexShrink: 0,
          boxShadow: '0 8px 20px rgba(241,106,36,0.22)',
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
          <img
            src={imgSrc}
            alt={member.name}
            width={112}
            height={112}
            onError={() => setImgSrc(FALLBACK_AVATAR)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              ...(member.image.includes('arun') ? { transform: 'scale(1.25)' } : {}),
              ...(member.image.includes('utso') ? { objectPosition: '50% 38%' } : {}),
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
          background: 'rgba(241,106,36,0.25)',
          marginBottom: '14px',
        }}
      />

      <div
        style={{
          fontSize: '12.5px',
          color: tokens.secondary,
          lineHeight: 1.6,
          flex: 1,
          width: '100%',
        }}
      >
        {member.description}
      </div>

      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '20px',
          width: '100%',
          padding: '11px 22px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #191c1e 0%, #2d3133 100%)',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 700,
          fontFamily: tokens.fonts.display,
          textDecoration: 'none',
          letterSpacing: '0.01em',
          boxShadow: '0 6px 18px rgba(0,0,0,0.22)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          boxSizing: 'border-box',
          flexShrink: 0,
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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        <span>Connect on LinkedIn</span>
      </a>
    </FadeIn>
  );
}

/* ───────────────────────── Premium Feature Card (Founder & Advisor) ───────────────────────── */

function FeatureCard({ person, eyebrow, reverse = false, delay = 0, accent = 'founder' }) {
  // Seniority-based top accent bar
  const accentStyles = {
    founder: {
      height: '6px',
      background: 'linear-gradient(90deg, #f16a24 0%, #f16a24 50%, #f16a24 100%)',
      opacity: 1,
    },
    advisor: {
      height: '5px',
      background: 'linear-gradient(90deg, #f16a24 0%, #f16a24 100%)',
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
        border: '1px solid rgba(241,106,36,0.1)',
        borderRadius: '28px',
        padding: 'clamp(20px, 3vw, 40px)',
        boxShadow:
          '0 1px 2px rgba(241,106,36,0.04), 0 12px 32px rgba(241,106,36,0.06), 0 28px 64px rgba(16,24,40,0.05)',
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
          background: tokens.surfaceContainer,
          boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
        }}
      >
        <Image
          src={person.image}
          alt={person.name}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
        {/* bottom gradient with name */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(15,15,17,0.85) 0%, rgba(15,15,17,0.15) 38%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        {/* Vignette overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 30%, transparent 45%, rgba(0,0,0,0.35) 100%)',
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: 0,
        }}
      >
        {eyebrow && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '16px',
            }}
          >
            <span style={{ flex: 1, maxWidth: 44, height: 2, borderRadius: 1, background: tokens.primary, flexShrink: 0 }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: tokens.primary, whiteSpace: 'nowrap' }}>
              {eyebrow}
            </span>
            <span style={{ flex: 1, maxWidth: 44, height: 2, borderRadius: 1, background: tokens.primary, flexShrink: 0 }} />
          </div>
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
                <circle cx="12" cy="12" r="11" fill="#fff" stroke="rgba(241,106,36,0.25)" strokeWidth="1" />
                <path
                  d="m8 12 2.5 2.5L16 9"
                  stroke="#f16a24"
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
              'linear-gradient(90deg, rgba(241,106,36,0.35), rgba(241,106,36,0.04))',
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: '16px',
            }}
          >
            <span style={{ flex: 1, maxWidth: 44, height: 2, borderRadius: 1, background: tokens.primary, flexShrink: 0 }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: tokens.primary }}>
              People
            </span>
            <span style={{ flex: 1, maxWidth: 44, height: 2, borderRadius: 1, background: tokens.primary, flexShrink: 0 }} />
          </div>
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
        <div
          className="team-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 'clamp(20px, 2vw, 28px)',
          }}
        >
          {advisors.map((a, i) => (
            <MemberCard key={a.name} member={a} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ImageCard;
