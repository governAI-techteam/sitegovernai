
'use client';
import ClientsMarqueeSection from '@/components/organisms/ClientsMarqueeSection';
import { tokens } from '@/theme/tokens';
import { FadeIn } from '@/components/atoms/FadeIn';
import Image from 'next/image';

const team = [
  {
    name: 'Chief Advisor',
    image: '/assets/img/advisor.png',
    description:
      'Dr. Murthy Remilla, Former Senior Scientist at ISRO and Head of Project Management for Gaganyaan, with 35+ years in technical and leadership roles.',
  },
  {
    name: 'AI & Healthcare Lead',
    image: '/assets/img/senior-1.png',
    description:
      'Dr. Utso Guha Roy, MD in Pathology (2018), Certified in AI Medicine (CCAIM), Post-Doctoral in Digital Pathology.',
  },
  {
    name: 'Chief Compliance Officer',
    image: '/assets/img/senior-2.png',
    description:
      'Alvin Antony, AI & Frontier Tech Lawyer | AI Governance, ISO 42001, IP & Data Protection | Certified Implementer/Auditor in ISO 42001:2023 and ISO 9001:2015.',
  },
  {
    name: 'DevSecOps Lead',
    role: '',
    image: '/assets/img/anubhav.jpeg',
    description:
      'Anubhav Sharma, Experienced in infrastructure automation, containerized environments, and secure system design. Focused on building scalable, resilient, and security-first platform foundations.',
  },
  {
    name: 'Applied AI Engineer',
    role: '',
    image: '/assets/img/aditya2.jpeg',
    description:
      'Aditya Udiya, AI product builder with 24+ applied AI solutions. Startup founder. Ex Research Intern at IIT BHU in AI and ML. National level winner in Software Systems. 6x hackathon winner.',
  },
  {
    name: 'AI & Healthcare Intern',
    role: '',
    image: '/assets/img/rutva.jpeg',
    description:
      'Dr. Rutva Tanna, BHMS professional focused on holistic wellness and patient-centered care. Bridging healthcare knowledge with AI-driven solutions for better clinical outcomes.',
  },
];

function ImageCard() {
  return (
    <>
      <FadeIn
        delay={0.1}
        yOffset={30}
        style={{ textAlign: 'center', marginBottom: '14px', marginTop: '40px' }}
      >
        <h2
          style={{
            fontFamily: tokens?.fonts?.display || 'inherit',
            fontSize: 'clamp(24px, 3.8vw, 36px)',
            fontWeight: 800,
            color: tokens.onSurface,
            letterSpacing: '-0.03em',
          }}
        >
          Meet the <span style={{ color: tokens.primary }}>Team</span>
        </h2>
      </FadeIn>
      <div className="image-holder">
        {team.map((member, index) => (
          <FadeIn
            key={index}
            delay={0.1 + index * 0.2}
            yOffset={40}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '18px',
              background: tokens.surface,
              borderRadius: '18px',
              boxShadow: '0 8px 28px rgba(0,0,0,0.06)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 38px rgba(0,0,0,0.11)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.06)';
            }}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={400}
              height={500}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '4/5',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '14px',
              }}
            />
            <h6
              style={{
                fontSize: '16px',
                fontWeight: 800,
                color: tokens.onSurface,
                textAlign: 'center',
                marginBottom: '6px',
              }}
            >
              {member.name}
            </h6>
            <div
              style={{
                fontSize: '13px',
                color: tokens.secondary,
                textAlign: 'center',
                lineHeight: 1.55,
              }}
            >
              <p>{member.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </>
  );
}

export default ImageCard;
