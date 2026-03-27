export const NAV_ITEMS = [
  { label: "Platform",   sectionId: "platform"   },
  { label: "Solutions",  sectionId: "solutions"  },
  { label: "Resources",  sectionId: "resources"  },
  { label: "Pricing",    sectionId: "pricing"    },
];

export const DEFAULT_PROBLEMS = [
  { icon: "warning",   iconColor: "#ba1a1a", iconBg: "#ffdad6", title: "Compliance Drift",   desc: "Regulations like the EU AI Act move faster than your dev cycles." },
  { icon: "analytics", iconColor: "#a04100", iconBg: "#ffdbcc", title: "Bias Opaque Blocks", desc: "Invisible patterns that degrade trust and performance." },
];

export const DEFAULT_FEATURES = [
  { icon: "visibility",   iconBg: "#ffdbcc", iconColor: "#351000", title: "Total Observability",   desc: "Real-time dashboards that translate model performance into business-level governance metrics." },
  { icon: "auto_awesome", iconBg: "#d5e3fc", iconColor: "#57657a", title: "Automated Remediation", desc: "Our system doesn't just flag issues; it suggests corrective architectural shifts instantly." },
];

export const DEFAULT_SERVICES = [
  { icon: "gavel",      title: "Regulatory Compliance", desc: "End-to-end alignment with global standards including EU AI Act, NIST, and ISO 42001." },
  { icon: "psychology", title: "Bias Mitigation",       desc: "Sophisticated detection engines that identify and neutralize algorithmic prejudice at the source." },
  { icon: "security",   title: "Risk Orchestration",    desc: "Enterprise-grade threat modeling for generative and predictive AI across the entire lifecycle." },
  { icon: "monitoring", title: "Continuous Oversight",  desc: "Automated reporting and monitoring that ensures long-term model stability and ethical integrity." },
];

export const DEFAULT_FRAMEWORK = [
  { icon: "strategy",        label: "Strategy",    accent: false },
  { icon: "inventory",       label: "Assessment",  accent: false },
  { icon: "shield",          label: "Integration", accent: true  },
  { icon: "verified",        label: "Validation",  accent: false },
  { icon: "visibility_lock", label: "Oversight",   accent: false },
];

export const DEFAULT_WORKFLOW = [
  { num: "01", title: "Model Cataloging",     desc: "Automated discovery of all AI assets across your tech stack, creating a central inventory of record.", active: false },
  { num: "02", title: "Dynamic Risk Scoring", desc: "Instant evaluation based on data sensitivity, model complexity, and deployment environment.",          active: false },
  { num: "03", title: "Policy Enforcement",   desc: "Hard-coded guardrails that prevent out-of-bounds execution and ensure compliance by design.",           active: true  },
];

export const DEFAULT_INDUSTRIES = [
  { icon: "account_balance", name: "Finance",        desc: "Securing algorithmic trading and credit scoring models." },
  { icon: "health_and_safety", name: "Healthcare",   desc: "HIPAA-compliant diagnostic and research AI oversight." },
  { icon: "factory",           name: "Manufacturing",desc: "Predictive maintenance and supply chain integrity." },
  { icon: "public",            name: "Public Sector",desc: "Ethical frameworks for government automation systems." },
];

export const DEFAULT_STANDARDS = [
  { label: "EU AI Act",         icon: null,           badge: "EU" },
  { label: "ISO 42001",         icon: "verified",     badge: null },
  { label: "NIST AI Framework", icon: "architecture", badge: null },
  { label: "GDPR Art. 22",      icon: "lock_open",    badge: null },
];

export const DEFAULT_COURSES = [
  { tag: "Workshop",      title: "Executive AI Risk",    desc: "A one-day intensive for board members and C-suite on AI liability and ethical strategy.",  cta: "Register Now"      },
  { tag: "Certification", title: "Certified AI Auditor", desc: "Deep technical dive into bias detection and performance monitoring protocols.",              cta: "Download Syllabus" },
  { tag: "Resources",     title: "Policy Templates",     desc: "Pre-vetted governance policy frameworks ready for enterprise adaptation.",                   cta: "Access Library"    },
];

export const DEFAULT_ARTICLES = [
  { date: "March 12, 2024", title: "Decoding the EU AI Act: What it means for 2025", desc: "The definitive guide to navigating the upcoming regulatory landscape."              },
  { date: "Feb 28, 2024",   title: "The Cost of Bias: A $20M Case Study",             desc: "How one financial institution reclaimed its reputation after a model failure."       },
  { date: "Jan 15, 2024",   title: "Oversight as an Innovation Engine",               desc: "Why governance isn't a brake, but the fuel for faster AI deployment."               },
];

export const DEFAULT_FOOTER_COLS = [
  { heading: "Platform", links: ["Risk Assessment", "Compliance", "Bias Detection"] },
  { heading: "Company",  links: ["About Us", "Careers", "Legal"] },
  { heading: "Legal",    links: ["Privacy Policy", "Terms of Service", "Security"] },
];
