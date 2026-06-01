
'use client';
import { tokens } from '@/theme/tokens';
import { FadeIn } from '@/components/atoms/FadeIn';
import Image from 'next/image';

const teamMembers = [
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

const advisors = [
  {
    name: 'Dr. Murthy Remilla',
    role: 'Chief Advisor',
    image: '/assets/img/advisor.png',
    description:
      'Former Senior Scientist at ISRO and Head of Project Management for Gaganyaan, with 35+ years in technical and leadership roles.',
  },
  {
    name: 'Dr. Utso Guha Roy',
    role: 'AI & Healthcare Lead',
    image: '/assets/img/senior-1.png',
    description:
      'MD in Pathology (2018), Certified in AI Medicine (CCAIM), Post-Doctoral in Digital Pathology.',
  },
  {
    name: 'Alvin Antony',
    role: 'Chief Compliance Officer',
    image: '/assets/img/senior-2.png',
    description:
      'AI & Frontier Tech Lawyer | AI Governance, ISO 42001, IP & Data Protection | Certified Implementer/Auditor in ISO 42001:2023 and ISO 9001:2015.',
  },
];

function MemberCard({ member, index }) {
  return (
    <FadeIn
      delay={0.1 + index * 0.15}
      yOffset={30}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 16px',
        background: tokens.surface,
        borderRadius: '14px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
        textAlign: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.05)';
      }}
    >
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: `3px solid ${tokens.primary}`,
          marginBottom: '14px',
          flexShrink: 0,
        }}
      >
        <Image
          src={member.image}
          alt={member.name}
          width={100}
          height={100}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <h6
        style={{
          fontSize: '15px',
          fontWeight: 700,
          color: tokens.onSurface,
          marginBottom: '4px',
          lineHeight: 1.3,
        }}
      >
        {member.name}
      </h6>
      <p
        style={{
          fontSize: '12px',
          color: tokens.primary,
          fontWeight: 600,
          marginBottom: '8px',
        }}
      >
        {member.role}
      </p>
      <div
        style={{
          fontSize: '12px',
          color: tokens.secondary,
          lineHeight: 1.5,
        }}
      >
        {member.description}
      </div>
    </FadeIn>
  );
}

function ImageCard() {
  return (
    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      {/* Team Section */}
      <FadeIn
        delay={0.1}
        yOffset={30}
        style={{ textAlign: 'center', marginBottom: '28px' }}
      >
        <h2
          style={{
            fontFamily: tokens?.fonts?.display || 'inherit',
            fontSize: 'clamp(22px, 3.5vw, 32px)',
            fontWeight: 800,
            color: tokens.onSurface,
            letterSpacing: '-0.03em',
          }}
        >
          Meet the <span style={{ color: tokens.primary }}>Team</span>
        </h2>
      </FadeIn>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}
      >
        {teamMembers.map((member, index) => (
          <MemberCard key={member.name} member={member} index={index} />
        ))}
      </div>

      {/* Advisors Section */}
      <FadeIn
        delay={0.2}
        yOffset={30}
        style={{ textAlign: 'center', marginBottom: '28px' }}
      >
        <h2
          style={{
            fontFamily: tokens?.fonts?.display || 'inherit',
            fontSize: 'clamp(22px, 3.5vw, 32px)',
            fontWeight: 800,
            color: tokens.onSurface,
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ color: tokens.primary }}>Advisors</span>
        </h2>
      </FadeIn>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}
      >
        {advisors.map((member, index) => (
          <MemberCard key={member.name} member={member} index={index + teamMembers.length} />
        ))}
      </div>
    </div>
  );
}

export default ImageCard;
