/*
  Central SEO configuration — single source of truth for site-wide metadata,
  canonical URLs, and structured-data (JSON-LD) building blocks.
  Update SITE_URL here if the production domain changes.
*/

export const SITE_URL = 'https://www.governai.info';

export const SITE = {
  name: 'GovernAI',
  legalName: 'GovernAI OPC Pvt. Ltd.',
  shortName: 'GovernAI',
  url: SITE_URL,
  // Default share image (1200x630 recommended). Falls back to the logo.
  ogImage: '/assets/img/logo.png',
  email: 'contact@governai.info',
  locale: 'en_IN',
  twitter: '@governaiofc',
  foundingYear: '2024',
  address: {
    city: 'New Delhi',
    region: 'Delhi',
    country: 'India',
    countryCode: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/governaiofficial/',
    'https://x.com/governaiofc',
  ],
};

/*
  Primary keyword universe. Targeted, intent-rich, and domain-specific so the
  site competes for high-value AI-governance queries rather than generic terms.
*/
export const SITE_KEYWORDS = [
  'AI Governance',
  'AI Governance India',
  'Responsible AI',
  'AI Compliance',
  'ISO 42001',
  'ISO/IEC 42001 implementation',
  'AI auditing',
  'AI policy advisory',
  'EU AI Act compliance',
  'NIST AI Risk Management Framework',
  'AI capacity building',
  'AI governance training',
  'public sector AI',
  'government AI training',
  'ethical AI frameworks',
  'AI risk management',
  'DPDP Act compliance',
  'trustworthy AI',
  'AI governance consulting',
  'GovernAI',
];

/* Reusable Organization JSON-LD (Knowledge Graph eligibility). */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${SITE.ogImage}`,
    },
    description:
      'GovernAI provides the architectural framework to deploy, monitor, and scale AI systems with absolute compliance, ethical frameworks, and zero bias — through capacity building, auditing, and policy advisory.',
    email: SITE.email,
    foundingDate: SITE.foundingYear,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.countryCode,
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'Global' },
    ],
    knowsAbout: [
      'AI Governance',
      'Responsible AI',
      'AI Compliance',
      'ISO/IEC 42001',
      'AI Auditing',
      'AI Policy',
    ],
    founder: { '@id': `${SITE_URL}/#founder` },
    employee: [
      { '@id': `${SITE_URL}/#founder` },
      { '@id': `${SITE_URL}/#person-alvin-antony` },
      { '@id': `${SITE_URL}/#person-utso-guha-roy` },
      { '@id': `${SITE_URL}/#person-anubhav-sharma` },
      { '@id': `${SITE_URL}/#person-aditya-udiya` },
      { '@id': `${SITE_URL}/#person-rutva-tanna` },
    ],
    sameAs: SITE.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE.email,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

/* WebSite JSON-LD (enables sitelinks search box eligibility + entity linking). */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    description:
      'Governing Artificial Intelligence for a responsible future — capacity building, compliance, and policy advisory.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  };
}

/* ProfessionalService JSON-LD — strongest fit for a B2B advisory/consultancy. */
export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: SITE.name,
    image: `${SITE_URL}${SITE.ogImage}`,
    url: SITE_URL,
    email: SITE.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.countryCode,
    },
    areaServed: { '@type': 'Country', name: 'India' },
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Governance Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'GovernAI Academy — Capacity Building & Training',
            description:
              'Executive sensitisation, immersive workshops, hands-on GenAI tooling, and NSQF-aligned academic courses.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Compliance — Auditing & Regulatory Assurance',
            description:
              'Compliance gap analysis, ISO/IEC 42001 readiness, independent AI auditing, and conformity assessments.',
          },
        },
      ],
    },
  };
}

/* BreadcrumbList helper for sub-pages. */
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/* ─────────────────────────  PEOPLE  ───────────────────────── */

/* Founder — Person schema (links to the Organization as founder/employee). */
export function founderSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#founder`,
    name: 'Parishrut Jassal',
    givenName: 'Parishrut',
    familyName: 'Jassal',
    jobTitle: 'Founder & Chief Executive Officer',
    worksFor: { '@id': `${SITE_URL}/#organization` },
    founder: { '@id': `${SITE_URL}/#organization` },
    image: `${SITE_URL}/assets/img/founder.png`,
    url: SITE_URL,
    nationality: { '@type': 'Country', name: 'India' },
    description:
      'TEDx Speaker and UKAS-recognised ISO/IEC 42001 Auditor. Working Group Member on AI & Digital Governance for the Government of Himachal Pradesh, former Deputy Advisor at NIEPA (Ministry of Education), AI Safety Governance Fellow, and member of ForHumanity (USA) on AI Audits & Regulation.',
    knowsAbout: [
      'AI Governance',
      'Responsible AI',
      'ISO/IEC 42001',
      'AI Policy',
      'AI Auditing',
      'AI Safety',
    ],
    sameAs: ['https://linkedin.com/in/parishrut-jassal'],
  };
}

/* Key team members — lightweight Person nodes tied to the Organization. */
export function teamSchema() {
  const people = [
    {
      id: 'alvin-antony',
      name: 'Alvin Antony',
      jobTitle: 'Chief Compliance Officer',
      image: '/assets/img/senior-2.png',
      description:
        'AI & Frontier Tech Lawyer specialising in AI Governance, ISO 42001, IP and Data Protection. Certified Implementer/Auditor in ISO 42001:2023 and ISO 9001:2015.',
      knowsAbout: ['AI Compliance', 'ISO/IEC 42001', 'Data Protection', 'AI Law'],
    },
    {
      id: 'utso-guha-roy',
      name: 'Dr. Utso Guha Roy',
      jobTitle: 'AI & Healthcare Lead',
      image: '/assets/img/senior-1.png',
      description:
        'MD in Pathology (2018), Certified in AI Medicine (CCAIM), with Post-Doctoral work in Digital Pathology.',
      knowsAbout: ['AI in Healthcare', 'Digital Pathology', 'Responsible AI'],
    },
    {
      id: 'anubhav-sharma',
      name: 'Anubhav Sharma',
      jobTitle: 'DevSecOps Lead',
      image: '/assets/img/anubhav.jpeg',
      description:
        'Infrastructure automation, containerized environments, and secure system design — building scalable, resilient, security-first platform foundations.',
      knowsAbout: ['DevSecOps', 'Cloud Security', 'Infrastructure Automation'],
    },
    {
      id: 'aditya-udiya',
      name: 'Aditya Udiya',
      jobTitle: 'Applied AI Engineer',
      image: '/assets/img/aditya2.jpeg',
      description:
        'AI product builder with 24+ applied AI solutions. Former Research Intern at IIT BHU in AI and ML; national-level winner in Software Systems and 6x hackathon winner.',
      knowsAbout: ['Applied AI', 'Machine Learning', 'AI Product Development'],
    },
    {
      id: 'rutva-tanna',
      name: 'Dr. Rutva Tanna',
      jobTitle: 'AI & Healthcare Intern',
      image: '/assets/img/rutva.jpeg',
      description:
        'BHMS professional bridging healthcare knowledge with AI-driven solutions for better clinical outcomes.',
      knowsAbout: ['AI in Healthcare', 'Clinical AI'],
    },
  ];

  return people.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person-${p.id}`,
    name: p.name,
    jobTitle: p.jobTitle,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    image: `${SITE_URL}${p.image}`,
    description: p.description,
    knowsAbout: p.knowsAbout,
  }));
}

/* Chief Advisor — Person schema. */
export function advisorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#advisor-murthy-remilla`,
    name: 'Dr. Murthy Remilla',
    jobTitle: 'Chief Advisor',
    worksFor: { '@id': `${SITE_URL}/#organization` },
    image: `${SITE_URL}/assets/img/advisor.png`,
    description:
      'Former Senior Scientist at ISRO and Head of Project Management for Gaganyaan, with 35+ years in technical and leadership roles.',
    alumniOf: { '@type': 'Organization', name: 'ISRO' },
    knowsAbout: ['Project Management', 'Aerospace Engineering', 'Technical Leadership'],
  };
}

/* Website developer — Person schema for Divyakush Punjabi. */
export function developerSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#developer-divyakush-punjabi`,
    name: 'Divyakush Punjabi',
    givenName: 'Divyakush',
    familyName: 'Punjabi',
    jobTitle: 'Web Developer',
    description:
      'Web developer and designer of the GovernAI website.',
    url: 'https://divyakush2006.github.io/divyakush-resume/',
    sameAs: ['https://divyakush2006.github.io/divyakush-resume/'],
    knowsAbout: ['Web Development', 'Next.js', 'UI/UX Design', 'Front-end Engineering'],
  };
}

/* ─────────────────────────  CONTENT SCHEMAS  ───────────────────────── */

/* WebPage schema for the home page. */
export function webPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'GovernAI | AI Governance, Compliance & Responsible AI',
    description:
      'GovernAI provides the architectural framework to deploy, monitor, and scale AI systems with absolute compliance and zero bias.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}${SITE.ogImage}` },
  };
}

/* FAQ schema — eligible for "People Also Ask" rich results. */
export const FAQS = [
  {
    q: 'What does GovernAI do?',
    a: 'GovernAI provides the architectural framework to deploy, monitor, and scale AI systems with absolute compliance and zero bias. We specialise in AI governance capacity building, ISO/IEC 42001 compliance auditing, and AI policy advisory for governments, universities, and enterprises.',
  },
  {
    q: 'What is AI governance?',
    a: 'AI governance is the set of policies, frameworks, and oversight mechanisms that ensure artificial intelligence systems are deployed responsibly — meeting regulatory standards, mitigating bias, and aligning with ethical and legal requirements such as ISO/IEC 42001, the EU AI Act, and the NIST AI Risk Management Framework.',
  },
  {
    q: 'Does GovernAI help with ISO/IEC 42001 compliance?',
    a: 'Yes. GovernAI offers compliance gap analysis, pre-assessment and readiness reviews, independent AI auditing, and conformity assessments aligned with ISO/IEC 42001 — the international standard for AI Management Systems.',
  },
  {
    q: 'Who does GovernAI work with?',
    a: 'GovernAI partners with government bodies, universities, research institutions, and enterprises. We have trained 2000+ officials across 5+ states and engaged 20+ institutions across India.',
  },
  {
    q: 'How can I contact GovernAI?',
    a: 'You can reach the GovernAI team via the contact form on our website or by email at contact@governai.info. We respond within one business day.',
  },
];

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
