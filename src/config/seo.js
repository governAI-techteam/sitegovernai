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
  description:
    'GovernAI delivers AI governance capacity building, ISO/IEC 42001 compliance auditing & responsible AI policy advisory. 2,000+ officials trained across India.',
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
  developerUrl: 'https://divyakush2006.github.io/divyakush-resume/',
};

/*
  Primary keyword universe — expanded with long-tail, question-based,
  and LSI keywords for maximum niche coverage across all AI governance
  search intents (informational, transactional, navigational).
*/
export const SITE_KEYWORDS = [
  // Core brand + primary
  'AI Governance',
  'AI Governance India',
  'Responsible AI',
  'AI Compliance',
  'GovernAI',

  // Standards & frameworks
  'ISO 42001',
  'ISO/IEC 42001 implementation',
  'ISO 42001 certification India',
  'how to implement ISO 42001',
  'AI auditing',
  'AI audit services India',
  'EU AI Act compliance',
  'NIST AI Risk Management Framework',
  'NIST AI RMF implementation',
  'DPDP Act compliance',
  'DPDP Act compliance services',

  // Services
  'AI policy advisory',
  'AI policy advisory India',
  'AI governance consulting',
  'AI compliance consulting firms',
  'AI governance company India',
  'AI capacity building',
  'AI governance training',
  'AI ethics training for government officials',
  'AI governance capacity building India',
  'responsible AI training programs',

  // Sector-specific
  'public sector AI',
  'government AI training',
  'AI in public administration',
  'AI governance for universities',
  'AI governance for healthcare',

  // Concepts
  'ethical AI frameworks',
  'AI risk management',
  'trustworthy AI',
  'AI bias mitigation',
  'AI safety governance',
  'AI accountability framework',

  // Question-based (People Also Ask targeting)
  'what is AI governance',
  'what is responsible AI',
  'AI governance framework for government',
  'how to ensure AI compliance',
  'AI governance best practices',

  // High-value additions — outrank competitors
  'AI governance platform India',
  'AI governance for public sector',
  'AI compliance India',
  'algorithmic auditing',
  'sovereign AI governance',
  'AI procurement standards',
  'AI literacy government',
  'AI governance consulting India',
  'digital governance AI',
  'AI governance workshop',
  'AI capacity building for government',
  'responsible AI India',
  'DPDP Act 2023',
  'AI governance training for IAS officers',
  'AI governance training for government',
  'AI risk assessment services',
  'AI policy framework India',
  'UKAS ISO 42001',
  'AI governance company',
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
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}${SITE.ogImage}`,
    description:
      'GovernAI is an AI governance company helping governments, universities, and enterprises deploy AI responsibly. Services span capacity building, ISO/IEC 42001 compliance auditing, and AI policy advisory, with 2,000+ officials trained across 5+ states and 20+ institutional engagements.',
    email: SITE.email,
    foundingDate: SITE.foundingYear,
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.countryCode,
      },
    },
    knowsLanguage: ['English', 'Hindi'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6139',
      longitude: '77.2090',
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
      'AI Risk Management',
      'AI Ethics',
      'NIST AI RMF',
      'EU AI Act',
      'DPDP Act',
    ],
    founder: { '@id': `${SITE_URL}/#founder` },
    employee: [
      { '@id': `${SITE_URL}/#founder` },
      { '@id': `${SITE_URL}/#person-alvin-antony` },
      { '@id': `${SITE_URL}/#person-utso-guha-roy` },
      { '@id': `${SITE_URL}/#person-anubhav-sharma` },
      { '@id': `${SITE_URL}/#person-himanshu-kalia` },
      { '@id': `${SITE_URL}/#person-preekshit-singh` },
    ],
    sameAs: SITE.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE.email,
      areaServed: ['IN', 'US', 'GB', 'SG'],
      availableLanguage: ['English', 'Hindi'],
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 5,
      maxValue: 15,
    },
    slogan: 'Governing Artificial Intelligence for a Responsible Future',
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
    alternateName: 'GovernAI India',
    description:
      'Governing Artificial Intelligence for a responsible future — capacity building, compliance, and policy advisory.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6139',
      longitude: '77.2090',
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'Singapore' },
    ],
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
              'Executive sensitisation, immersive workshops, hands-on GenAI tooling, and NSQF-aligned academic courses for government officials, university faculty, and enterprise teams.',
            serviceType: 'AI Governance Training',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Compliance — Auditing & Regulatory Assurance',
            description:
              'Compliance gap analysis, ISO/IEC 42001 readiness, independent AI auditing, and conformity assessments aligned with global standards including EU AI Act and NIST AI RMF.',
            serviceType: 'AI Compliance Auditing',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Policy Advisory',
            description:
              'Strategic AI policy formulation, regulatory readiness assessments, and DPDP Act compliance advisory for public and private sector organizations.',
            serviceType: 'AI Policy Consulting',
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

/* ItemList schema for insights — enables rich carousel in Google results. */
export function insightsItemListSchema(insights, slugify) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'GovernAI Insights — AI Governance Knowledge',
    description:
      'Expert insights, event recaps, and thought leadership on AI governance, responsible AI, and compliance from GovernAI.',
    numberOfItems: insights.length,
    itemListElement: insights.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/insights/${slugify(item.title)}/`,
      name: item.title,
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
    image: `${SITE_URL}/assets/img/founder/founder.jpg`,
    url: SITE_URL,
    nationality: { '@type': 'Country', name: 'India' },
    description:
      'TEDx Speaker and UKAS-recognised ISO/IEC 42001 Auditor. Working Group Member (Digital & AI Governance) on I.T. Infrastructure, Cyber-Hubs & Future Ready Industries for the Government of Himachal Pradesh, former Deputy Advisor at NIEPA (Ministry of Education), Doctoral Researcher on the Global Governance of AI for Sustainable Peace, and member of ForHumanity (USA) on AI Audits & Regulation.',
    knowsAbout: [
      'AI Governance',
      'Responsible AI',
      'ISO/IEC 42001',
      'AI Policy',
      'AI Auditing',
      'AI Safety',
    ],
    knowsLanguage: ['English', 'Hindi'],
    memberOf: [{ '@type': 'Organization', name: 'ForHumanity' }],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'UKAS-recognised ISO/IEC 42001 Lead Auditor',
      },
    ],
    award: 'TEDx Speaker',
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
      image: '/assets/img/Team/team_alvin.jpeg',
      description:
        'AI & Frontier Tech Lawyer specialising in AI Governance, ISO 42001, IP and Data Protection. Certified Implementer/Auditor in ISO 42001:2023 and ISO 9001:2015.',
      knowsAbout: ['AI Compliance', 'ISO/IEC 42001', 'Data Protection', 'AI Law'],
    },
    {
      id: 'utso-guha-roy',
      name: 'Dr. Utso Guha Roy',
      jobTitle: 'AI & Healthcare Lead',
      image: '/assets/img/Team/team_utso.png',
      description:
        'MD in Pathology (2018), Certified in AI Medicine (CCAIM), with Post-Doctoral work in Digital Pathology.',
      knowsAbout: ['AI in Healthcare', 'Digital Pathology', 'Responsible AI'],
    },
    {
      id: 'anubhav-sharma',
      name: 'Anubhav Sharma',
      jobTitle: 'Technical & Security Lead',
      image: '/assets/img/Team/team_anubhav.jpeg',
      description:
        'Information security architect specializing in security methodologies, compliance frameworks, risk assessment, and audit engagements. Leads technical infrastructure and cybersecurity initiatives.',
      knowsAbout: ['DevSecOps', 'Cloud Security', 'Cybersecurity'],
    },
    {
      id: 'himanshu-kalia',
      name: 'Dr. Himanshu Kalia',
      jobTitle: 'AI & Healthcare Consultant',
      image: '/assets/img/Team/team_himanshu.jpeg',
      description:
        'Scientific Officer at IIT DRISHTI CPS with an MSc from the University of Glasgow. Contributes expertise in healthcare research, scientific innovation, and AI applications.',
      knowsAbout: ['AI in Healthcare', 'Healthcare Research', 'Interdisciplinary Technology'],
    },
    {
      id: 'preekshit-singh',
      name: 'Er. Preekshit Singh',
      jobTitle: 'Operations & Training Lead',
      image: '/assets/img/Team/team_preekshit.png',
      description:
        'Civil engineer overseeing academy operations, training delivery, process optimization, and organizational execution across initiatives.',
      knowsAbout: ['Operations Management', 'Training Delivery', 'Process Optimization'],
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
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#advisor-murthy-remilla`,
      name: 'Dr. Murthy Remilla',
      jobTitle: 'President, Telemedicine Society of India',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      image: `${SITE_URL}/assets/img/team_murthy.png`,
      description:
        'Former ISRO Scientist and leader in healthcare technology and digital transformation. Advises on AI governance, healthcare innovation, and telemedicine adoption.',
      alumniOf: { '@type': 'Organization', name: 'ISRO' },
      knowsAbout: ['AI Governance', 'Healthcare Technology', 'Telemedicine'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#advisor-maya-sherman`,
      name: 'Maya Sherman',
      jobTitle: 'International AI Policy Advisor',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      image: `${SITE_URL}/assets/img/team_maya.jpeg`,
      description:
        'Former Science, Technology, and Innovation Attaché at the Embassy of Israel. Provides strategic guidance on AI governance, international policy frameworks, and responsible AI development.',
      knowsAbout: ['AI Policy', 'International Governance', 'Responsible AI'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#advisor-arun-pandit`,
      name: 'Arun Pandit',
      jobTitle: 'Industry Advisor',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      image: `${SITE_URL}/assets/img/team_arun.png`,
      description:
        'Co-Founder of Hyphen SCS, Chairman of AIMA Young Leaders Council, and TEDx Speaker. Brings experience in entrepreneurship, leadership development, and business strategy.',
      knowsAbout: ['Entrepreneurship', 'Leadership Development', 'Business Strategy'],
    },
  ];
}

/* Website developer — Person schema for Divyakush Punjabi. Accepts
   dynamic data from getDeveloperData() for build-time freshness.
   Enhanced with mainEntityOfPage, makesOffer, hasCredential for
   Knowledge Panel eligibility. */
export function developerSchema(data) {
  const d = data || {};
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#developer-divyakush-punjabi`,
    name: d.name || 'Divyakush Punjabi',
    givenName: 'Divyakush',
    familyName: 'Punjabi',
    jobTitle: d.jobTitle || 'Full Stack Developer & AI Engineer',
    description:
      d.bio ||
      'Full Stack Developer and AI Engineer specializing in enterprise web applications, AI/ML integration, and UI/UX engineering.',
    url: SITE.developerUrl,
    mainEntityOfPage: 'https://divyakush2006.github.io/divyakush-resume/',
    ...(d.avatar ? { image: d.avatar } : {}),
    sameAs: [
      SITE.developerUrl,
      d.github || 'https://github.com/divyakush2006',
      d.linkedin || 'https://linkedin.com/in/divyakush-punjabi',
      ...(d.blog ? [d.blog] : []),
    ],
    knowsAbout: [
      'Web Development',
      'Next.js',
      'React',
      'TypeScript',
      'UI/UX Design',
      'Front-end Engineering',
      'AI/ML Integration',
      'Full Stack Development',
      'Responsive Design',
      'Performance Optimization',
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Full Stack Web Development',
          description: 'Enterprise web application development using Next.js, React, and modern frameworks.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI/ML Integration',
          description: 'Integration of artificial intelligence and machine learning capabilities into web applications.',
        },
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        educationalLevel: 'Bachelor',
        recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Vellore Institute of Technology' },
      },
    ],
    ...(d.location ? { homeLocation: { '@type': 'Place', name: d.location } } : {}),
    ...(d.company ? { worksFor: { '@type': 'Organization', name: d.company } } : {}),
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Vellore Institute of Technology' },
      { '@type': 'CollegeOrUniversity', name: 'Indian Institute of Technology, Ropar' },
    ],
    nationality: { '@type': 'Country', name: 'India' },
    email: 'divyakushpunjabi@gmail.com',
  };
}

/* Article schema for insight/blog pages. */
export function articleSchema({ slug, title, description, image, location, datePublished, author }) {
  const wordCount = description ? description.split(/\s+/).length : 0;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/insights/${slug}/#article`,
    headline: title,
    description: description,
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${image}`,
      caption: title,
    },
    datePublished: datePublished || undefined,
    dateModified: datePublished || undefined,
    author: author
      ? { '@type': 'Person', name: author }
      : { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/insights/${slug}/` },
    wordCount,
    inLanguage: 'en-IN',
    ...(location
      ? { contentLocation: { '@type': 'Place', name: location } }
      : {}),
  };
}

/* Event schema — insights that are conferences, workshops, or summits
   become eligible for Google Event rich results (date, location cards).
   Auto-inferred: any insight with a location and datePublished is treated
   as an event. */
export function eventSchema({ slug, title, description, image, location, datePublished, author }) {
  if (!location || !datePublished) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    '@id': `${SITE_URL}/insights/${slug}/#event`,
    name: title,
    description: description,
    startDate: datePublished,
    endDate: datePublished,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: location,
        addressCountry: 'IN',
      },
    },
    image: image ? `${SITE_URL}${image}` : undefined,
    organizer: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'GovernAI',
      url: SITE_URL,
    },
    performer: author
      ? { '@type': 'Person', name: author }
      : { '@id': `${SITE_URL}/#organization` },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/insights/${slug}/`,
    },
    inLanguage: 'en-IN',
  };
}

/* ─────────────────────────  CONTENT SCHEMAS  ───────────────────────── */

/* WebPage schema for the home page — with SpeakableSpecification for voice search. */
export function webPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'GovernAI — AI Governance, Compliance & ISO 42001',
    description:
      'GovernAI delivers AI governance capacity building, ISO/IEC 42001 compliance auditing & responsible AI policy advisory. 2,000+ officials trained across 10+ states in India.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}${SITE.ogImage}` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.ds-lead', '.ds-card-desc'],
    },
    lastReviewed: new Date().toISOString().split('T')[0],
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
      ],
    },
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

/* CreativeWork schema — declares GovernAI website as a WebApplication
   built by Divyakush Punjabi. Google uses this to build entity
   associations ("Divyakush Punjabi built GovernAI"). */
export function creativeWorkSchema(dev) {
  const d = dev || {};
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${SITE_URL}/#web-application`,
    name: 'GovernAI',
    url: SITE_URL,
    description: SITE.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    creator: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#developer-divyakush-punjabi`,
      name: d.name || 'Divyakush Punjabi',
      url: 'https://divyakush2006.github.io/divyakush-resume/',
    },
    sourceOrganization: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'GovernAI',
    },
    dateCreated: '2025-01-01',
    inLanguage: 'en-IN',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };
}
