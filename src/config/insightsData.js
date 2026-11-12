export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[–—''"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getInsightBySlug(slug) {
  return (
    insightsData.find(
      (item) => (item.slug && item.slug === slug) || slugify(item.title) === slug || String(item.id) === slug
    ) || null
  );
}

export const INSIGHT_CATEGORIES = [
  { id: 'all', label: 'All Publications' },
  { id: 'whitepaper', label: 'Whitepapers & Research' },
  { id: 'brief', label: 'Published Policy & Articles' },
  { id: 'moment', label: 'Field Engagements' },
];

export const insightsData = [
{
    id: 'operationalizing-depa-for-ai-training',
    slug: 'operationalizing-depa-for-ai-training',
    category: 'whitepaper',
    featured: true,
    badge: 'National Flagship Whitepaper',
    title: 'Operationalizing DEPA for AI Training',
    subtitle: "The Governance, Risk & Verification Blueprint for India's AI Ecosystem",
    description: "An exhaustive breakdown of Confidential Clean Rooms, Differential Privacy budgets (ε-bounds), and DPDP Section 17(2)(b) statutory safe harbors for multi-party foundational AI training.",
    readTime: '18 min read',
    datePublished: '2025-11-10',
    author: 'GovernAI Research & Policy Directorate',
    downloadPdf: '/docs/depa-ai-training-whitepaper.pdf',
    image: '/assets/img/abstract/depa-thumbnail.webp',
    tags: ['National DPI', 'DEPA for AI Training', 'DPDP Act 2023', 'ISO 42001', 'Confidential Clean Rooms'],
    content: `# Operationalizing DEPA for AI Training
### The Governance, Risk & Verification Blueprint for India's AI Ecosystem

---

## 1. Executive Summary & National Mandate

India stands at a pivotal historical junction in the emergence of the global artificial intelligence economy. Backed at the highest level of Union Government leadership—including the Ministry of Electronics and Information Technology (MeitY), the National e-Governance Division (NeGD), the Department of Science and Technology (DST), the Ministry of External Affairs (MEA), and the Office of the Principal Scientific Adviser (PSA)—India is pioneering **DEPA for AI Training (DEPA 2.0)** as the nation's foundational Digital Public Infrastructure (DPI) for artificial intelligence.

While India generates petabytes of multimodal transactional, clinical, and administrative data daily, high-value training datasets remain locked behind institutional firewalls. Traditional data-sharing models rely on copying or transferring raw records—an approach rendered legally untenable by the punitive liabilities of the **Digital Personal Data Protection (DPDP) Act, 2023** (carrying statutory penalties up to ₹250 Crore per incident) and commercially unacceptable due to the risk of leaking trade secrets.

DEPA for AI Training resolves this national impasse through a structural inversion: **"The model travels to the data."** Compute occurs strictly within hardware-isolated **Confidential Clean Rooms (CCRs)**, governed by machine-readable **Electronic Contracts**, and protected by mathematical **Differential Privacy (DP-SGD)**.

However, as formalised in the official MeitY Handbook (*DEPA for AI Training: A National Framework*), hardware enclaves guarantee confidentiality but cannot verify whether a trained model is biased, brittle, unexplainable, or vulnerable to adversarial extraction. This publication delivers the operational governance, risk assessment, and verification blueprint required by enterprise CIOs, Data Protection Officers (DPOs), and Ministry/Department Organizations (MDOs) to operationalize DEPA for AI Training with verifiable institutional integrity.

---

## 2. The Data Deadlock: Training vs. Inference

To understand why a new national architecture is necessary, institutions must distinguish between **DEPA 1.0 (Inference)** and **DEPA 2.0 (Training)**:

| Dimension | DEPA 1.0 (Inference / Account Aggregator) | DEPA 2.0 (DEPA for AI Training) |
| :--- | :--- | :--- |
| **Data Flow** | 1-to-1 point-to-point data transfer from Provider to Consumer | Bulk data confinement; the AI model travels into the enclave |
| **Consent Model** | Granular, transactional consent per individual Data Principal | Statutory Safe Harbor under DPDP Section 17(2)(b) for research |
| **Compute Location** | Consumer's internal application or server | Hardware-attested Confidential Clean Room (TEE) |
| **Privacy Guarantee** | Contractual purpose limitation & encryption in transit | Mathematical Differential Privacy (ε, δ) + silicon memory encryption |
| **Output Artifact** | Raw or aggregated records evaluated in real-time | Trained model weights only; zero raw records ever leave the enclave |

In DEPA 1.0, consent is revocable, transactional, and tailored to immediate personal benefit (such as approving a digital credit appraisal or porting medical histories). If applied to foundation model training, an AI builder would need to solicit consent from millions of individuals. If ten thousand individuals later revoke consent, the model weights cannot mathematically "unlearn" those records without discarding weeks of compute and millions of dollars in capital. Point-to-point consent is the correct mechanism for individual agency, but it fails completely for statistical machine learning.

The resulting "Data Deadlock" deprives Indian startups and research bodies of sovereign training data, exacerbating the MSME credit gap (estimated by RBI at ₹20–25 Trillion) and forcing domestic developers to rely on synthetic or imported Western datasets.

---

## 3. Architectural Blueprint: Confinement Over Transfer

DEPA for AI Training is engineered around the **ADEPTS** principles (*Accountability, Democratization, Evolvability, Privacy, Transparency, and Security*). The architecture separates governance into three distinct operational planes:

### A. The Control Plane (SRO Registry & Contract Service)
Built on the **Confidential Consortium Framework (CCF)** operating within hardware enclaves, the Contract Service functions as an immutable, append-only, tamper-evident ledger. It maintains the registry of verified Training Data Providers (TDPs), Training Data Consumers (TDCs), and accredited CCR operators. All agreements are signed using **CBOR Object Signing and Encryption (COSE)** and recorded as IETF SCITT-aligned receipts.

### B. The Authorization Layer (Machine-Readable Rego Policies)
Access to datasets is never granted through discretionary verbal agreements. Instead, datasets are registered alongside Open Policy Agent (OPA) **Rego** data usage policies. These policies encode mathematical constraints:
- Maximum permitted privacy loss budget (Epsilon ε).
- Relational join limits (strictly 1-row-per-principal to prevent gradient sensitivity explosion).
- Approved hardware TCB measurement digests.

### C. The Execution Plane (Ephemeral Confidential Clean Rooms)
Compute workloads are instantiated strictly inside single-use, hardware-isolated Trusted Execution Environments (Intel SGX/TDX, AMD SEV-SNP, or NVIDIA H100 Confidential GPUs). Decryption keys are released by the Key Management Service (KMS) **only after** remote attestation proves that the enclave's Trusted Computing Base (TCB) matches the cryptographically signed contract. Once training finishes and the privacy noise is injected, the enclave destroys its ephemeral memory keys and dissolves.

---

## 4. The Statutory Shield: Section 17(2)(b) DPDP Act

For Corporate General Counsel and Enterprise DPOs, the defining breakthrough of DEPA for AI Training is its formal alignment with the statutory safe harbor under **Section 17(2)(b) [Chapter IV Clause 2(b)] of the Digital Personal Data Protection Act, 2023**:

> *"Personal data is processed for research, archiving or statistical purposes if the personal data is not to be used to take any decision specific to a Data Principal and such processing is carried on in accordance with such standards as may be prescribed."*

Parliament deliberately created this safe harbor to prevent the collapse of domestic data-driven scientific discovery. However, claiming this statutory defense before the Data Protection Board of India (DPBI) requires satisfying two cumulative legal criteria:
1. **The "No Specific Decision" Test:** The pipeline must cryptographically guarantee that personal data is processed solely for aggregate weight optimization, and is never used to profile, evaluate, or take an administrative decision regarding that individual.
2. **The "Prescribed Standards" Test:** The custodian must demonstrate that processing occurred within provable, hardware-attested environments with formal mathematical bounds against memorization and re-identification.

Subjective claims of "we removed names and phone numbers" do not survive regulatory scrutiny. Simple pseudonymisation fails against linkage attacks. Only hardware confinement paired with Differentially Private Stochastic Gradient Descent (DP-SGD) provides the mathematical proof required to maintain the Section 17(2)(b) shield.

---

## 5. The Four Mandatory Model Verification Checks

A dangerous fallacy in enterprise technology is the belief that hardware enclaves solve the governance challenge. A clean room guarantees confidentiality; it cannot determine whether the model emerging from its memory registers is safe, fair, or lawful.

In accordance with Chapter 2 (Pages 29–30) and Chapter 3 of the official MeitY Handbook, DEPA for AI Training mandates that before any trained model can be released from a Secure Data Environment, it **must pass four independent, non-negotiable verification checks**:

### Check 1: Demographic Bias & Algorithmic Fairness
The model must undergo systematic evaluation across Indian demographic axes—including regional, socioeconomic, gender, and linguistic cohorts. A diagnostic model trained on urban private hospital data exhibiting an 85% false-negative rate for rural cohorts is fundamentally defective and legally actionable under consumer protection statutes.

### Check 2: Security & Adversarial Robustness
The model must be stress-tested against model inversion attacks, membership inference, gradient reconstruction, and prompt injection vulnerabilities.

### Check 3: Complex Adaptive Safety
The system must undergo adversarial black-box simulation to evaluate emergent risks, hallucinations, and catastrophic cascade failures when interacting with broader economic or digital ecosystems.

### Check 4: Algorithmic Explainability & Interpretability
High-stakes deployments in healthcare, banking, and public welfare must produce verifiable rationale traces for automated outputs, ensuring that clinicians, loan officers, and citizens can understand and appeal automated decisions.

---

## 6. Zero-Knowledge Audit Harness & ε-Budget Governance

GovernAI addresses the fundamental paradox of confidential compute: **How do you audit an AI system that nobody is permitted to see?**

GovernAI deploys an automated, zero-knowledge evaluation harness directly inside the ephemeral clean room. The audit engine runs pre-release verification scripts against curated benchmark test sets within the enclave. The harness outputs an attestation certificate containing:
- Verifiable fairness metrics across protected demographic slices.
- Adversarial robustness scores.
- Longitudinal Epsilon (ε) cumulative consumption tracking.

By monitoring privacy budgets longitudinally across multiple training iterations, GovernAI prevents the "death by a thousand queries" vulnerability—ensuring that repeated training runs on the same underlying cohort do not cumulatively erode mathematical privacy.

---

## 7. Enterprise & Public MDO Implementation Roadmap

For enterprise leadership and government departments preparing to participate in the DEPA for AI Training ecosystem, GovernAI recommends a phased 5-step operational roadmap:

1. **Dataset Discovery & Data Card Standardization:** Audit internal data assets; author standardized metadata cards documenting schema, collection provenance, and licensing rights.
2. **Sensitivity Categorization:** Classify datasets according to the 3-tier sensitivity matrix (Level 0: Non-sensitive/Aggregate; Level 1: Renewable DP-budget training; Level 2: Strict social-good confinement).
3. **Machine-Readable Rego Policy Compilation:** Convert existing legal data-sharing agreements into machine-readable OPA Rego policies governing clean room ingestion.
4. **Attestation & Hardware Enclave Integration:** Benchmark training pipelines on Intel TDX or AMD SEV-SNP confidential virtual machines with PyTorch Opacus DP-SGD gradient clipping.
5. **Independent Pre-Release Verification:** Contract accredited third-party auditing authorities to run the four mandatory MeitY verification checks prior to model weight export.

---

### Conclusion & Executive Consultation
GovernAI operates as the independent governance, trust, and auditing authority for India's AI ecosystem. To schedule an executive briefing, board workshop, or clean-room compliance diagnostic, contact our advisory practice at **contact@governai.info**.`
  },
  {
    id: 'how-artificial-intelligence-is-reimagining-agriculture-in-india-this-kharif-season-and-beyond',
    slug: 'how-artificial-intelligence-is-reimagining-agriculture-in-india-this-kharif-season-and-beyond',
    category: 'brief',
    featured: true,
    badge: 'The Hindu BusinessLine',
    title: 'How Artificial Intelligence is Reimagining Agriculture in India: This Kharif Season and Beyond',
    subtitle: 'Harnessing AI for Accurate Weather Predictions, Climate Resilience, and Agri-Livelihoods',
    description: 'For millions of Indian farmers, AI is becoming a critical line of defense—crunching data from on-ground sensors and satellites to provide early warning for drought, heat stress, and pest outbreaks.',
    readTime: '6 min read',
    datePublished: '2025-08-09',
    author: 'Pranav Dwivedi & Parishrut Jassal',
    externalUrl: 'https://www.thehindubusinessline.com/economy/agri-business/how-artificial-intelligence-is-reimagining-agriculture-in-india-this-kharif-season-and-beyond/article69911235.ece',
    image: '/assets/img/abstract/the-hindu-agri-cover.webp',
    tags: ['The Hindu BusinessLine', 'Agri-AI', 'Climate Resilience', 'Soil Health Card', 'YES-TECH', 'IndiaAI'],
    content: `# How Artificial Intelligence is Reimagining Agriculture in India: This Kharif Season and Beyond

*Published in **The Hindu BusinessLine** on August 9, 2025*  
*By **Pranav Dwivedi** & **Parishrut Jassal** (Future Shift Labs)*  
[Read original publication on The Hindu BusinessLine →](https://www.thehindubusinessline.com/economy/agri-business/how-artificial-intelligence-is-reimagining-agriculture-in-india-this-kharif-season-and-beyond/article69911235.ece)

---

For millions of Indian farmers, the most critical tool this monsoon season isn't a new tractor or machine, but an algorithm on their phone. As climate change makes the monsoon rains more erratic, artificial intelligence is being harnessed as a crucial line of defence, predicting weather with accuracy and safeguarding the livelihoods that depend on the Kharif harvest.

The kharif season, spanning June to September, is the backbone of India's food system. Yet, it is perennially vulnerable to the fluctuations of the southwest monsoon, which provides about 70 per cent of the country's annual rainfall.

In 2024, erratic rainfall patterns led to significant crop losses across major agricultural states. In the current season, climate-resilient farming is shifting from an aspiration to an urgent survival strategy. This is where AI-driven agritech comes in.

## 1. Precise Predictions for Climate Uncertainty

Traditional weather forecasts often provide regional averages that fail to capture hyper-local variations. AI systems, on the other hand, analyse vast streams of real-time data from meteorological satellites, Doppler radars, and automated weather stations. 

Machine learning algorithms process this data to forecast rainfall, wind patterns, and temperature fluctuations at the block and village levels. This enables farmers to make informed decisions about when to sow, irrigate, or harvest, avoiding costly mistakes caused by unpredicted downpours or sudden dry spells.

## 2. Satellite-Powered Insights & Soil Diagnostics

Complementing weather forecasts are satellite-driven remote sensing systems that monitor crop health, soil moisture, and pest vulnerabilities. Startups and agricultural institutions are deploying computer vision to assess crop canopy greenness and identify early signs of stress before they become visible to the naked eye.

AI-enabled platforms also analyse satellite-derived vegetation indices (such as NDVI) alongside on-ground soil sensor data to generate tailored fertiliser and micro-irrigation schedules. This targeted application not only conserves scarce groundwater but also curtails input costs for smallholders.

## 3. State-Level Leadership: From Haryana to Gujarat

India's states are actively deploying AI solutions tailored to their agro-climatic realities:

- **Haryana:** Establishing dedicated AI hubs in Gurugram and Panchkula under its state AI Mission to support localized agri-tech solutions. The *Meri Fasal Mera Byora* portal empowers farmers by linking crop registration to minimum support price (MSP) sales, subsidies, and PMFBY insurance.
- **Madhya Pradesh:** Pioneering technology-based yield estimation through YES-TECH, utilising remote sensing and drone imaging for precise crop assessments and transparent claim settlements, largely replacing error-prone manual crop-cutting experiments.
- **Uttar Pradesh:** Launching an Agritech Innovation Hub in partnership with academic institutions to accelerate farm-level AI tools.
- **Gujarat:** Rolling out *Krushi Pragati*, integrating real-time localized weather alerts, pest surveillance, and resource optimization across the state's agricultural belts.

## 4. The Digital Sowing: Expanding Access & Agency

India's Soil Health Card (SHC) programme has already issued over 24.74 crore cards, delivering nutrient status data and tailored recommendations to farmers. Yet, digital illiteracy remains a hurdle, with only about 20 per cent of Indian farmers currently utilizing digital tools directly.

Bridging this divide requires voice-enabled, vernacular interfaces (such as Bhashini-powered generative voice assistants) that translate complex predictive models into intuitive spoken advisories in local dialects.

As the monsoon steers another Kharif season, AI is no longer a distant promise—it is an urgent imperative for Indian agriculture. The seeds of the next green revolution are digital, and the time to sow them is now.

---

*(Pranav Dwivedi is a subject matter expert and Parishrut Jassal is an advisor at Future Shift Labs and Founder of GovernAI.)*`
  },
  {
    id: 'panchatantra-2-0-a-culturally-grounded-approach-for-childrens-digital-rights-and-online-safety',
    slug: 'panchatantra-2-0-a-culturally-grounded-approach-for-childrens-digital-rights-and-online-safety',
    category: 'whitepaper',
    featured: true,
    badge: 'Pontifical Academy of Sciences',
    title: 'Panchatantra 2.0: A Culturally Grounded Approach for Children’s Digital Rights and Online Safety',
    subtitle: 'Pontificia Academia Scientiarum (Scripta Varia 158) | DOI: 10.65398/CCFQ1845',
    description: 'Synthesizing an AI-enhanced digital literacy framework that leverages Indian ancestral storytelling to instill ethical values, understand algorithmic data trails, and advance children\'s digital rights.',
    readTime: '14 min read',
    datePublished: '2025-04-12',
    author: 'Sagar Vishnoi, Parishrut Jassal & Alisha Butala',
    externalUrl: 'https://www.pas.va/en/publications/scripta-varia/sv158pas/vishnoi.html',
    image: '/assets/img/abstract/panchatantra-thumbnail.webp',
    tags: ['Pontifical Academy of Sciences', 'Digital Rights', 'Panchatantra 2.0', 'DPDP Act', 'UNCRC', 'Children AI Safety'],
    content: `# Panchatantra 2.0: A Culturally Grounded Approach for Children’s Digital Rights and Online Safety

*Published by the **Pontificia Academia Scientiarum** (Scripta Varia 158)*  
*DOI: [10.65398/CCFQ1845](https://doi.org/10.65398/CCFQ1845) | [Read on Vatican PAS Portal →](https://www.pas.va/en/publications/scripta-varia/sv158pas/vishnoi.html)*  
*By **Sagar Vishnoi**, **Parishrut Jassal**, and **Alisha Butala** (Future Shift Labs)*

---

## Abstract

Enhancing children’s safety within the evolving digital landscape is paramount for fostering future-ready education. This paper directly addresses this imperative by synthesizing an AI-enhanced digital literacy framework aimed at cultivating critical engagement and ethical understanding among children, thereby contributing to their safety and preparedness for the future. 

The primary approach detailed herein is a comprehensive framework that emphasizes data rights and safeguarding in the digital age. This is complemented by a culturally grounded implementation strategy, an integral part of our approach, which notably leverages Indian ancestral stories—narratives from the *Panchatantra*—to make complex concepts relatable and instill ethical values. 

Key objectives of the framework include developing a nuanced understanding of data trails, promoting awareness of data collection’s personal implications, knowledge of pertinent legal data rights (such as India’s DPDP Act 2023, the EU GDPR, and UNCRC), and empowering children with ownership and agency over their personal data.

## 1. Introduction: Digital Childhood in the Algorithmic Age

The pervasive integration of digital technologies and Artificial Intelligence (AI) into daily life has fundamentally reshaped how children learn, interact, and perceive the world, bringing forth unprecedented opportunities alongside significant challenges to their safety and well-being online (UNICEF, 2021). 

Children are increasingly navigating complex online environments, often without a comprehensive understanding of their digital footprint or the implications of their data being collected and utilized. To address this critical need, this paper proposes an AI-enhanced digital literacy framework that moves beyond mere technical proficiency to foster deep, critical, and ethically informed engagement.

## 2. Core Objectives of the Framework

### 2.1. Understanding Data Trails: Making the Invisible Visible
A primary objective is to enable students to comprehend how their personal data is captured, used, and stored across various digital platforms. Comparing digital trails to "footprints left in the sand" offers a tangible analogy for younger learners. Exercises like the **"Data Diary"** allow students to log their digital touchpoints over 24 hours, categorizing algorithmic surveillance and sensor capture.

### 2.2. Algorithmic Awareness & Agency
AI systems require vast amounts of data to learn and improve, incentivizing mass data collection that may follow children throughout their adult lives. The framework addresses algorithmic influence, automated profiling, and automated decision-making in both low-stakes areas (content recommendation, targeted advertising) and high-stakes areas (educational tracking, algorithmic admissions).

### 2.3. Knowing Pertinent Legal Rights (DPDP, GDPR, UNCRC)
The framework demystifies fundamental data protection legislation:
- **DPDP Act 2023 (Section 9):** Strict parental consent mandates and restrictions on behavioral tracking or targeted ads directed at children.
- **EU GDPR (Article 8):** Special protection for children's personal data.
- **UN Convention on the Rights of the Child (General Comment No. 25):** The child's right to privacy, expression, and safety in digital environments.

## 3. Panchatantra 2.0: Cultural Storytelling as Pedagogical Vehicle

To ensure children’s understanding of digital rights and privacy is both engaging and deeply internalized, our framework integrates **Panchatantra 2.0**—a reimagining of ancient Indian animal fables adapted for the digital era:

- *The Lion and the Canny Hare (Algorithmic Echo Chambers & Deception)*
- *The Blue Jackal (Synthetic Identity, Deepfakes & Authenticity)*
- *The Monkey and the Wedge (Curiosity, Malware & Exploitative Permissions)*

By framing contemporary cyber risks within timeless cultural metaphors, children cultivate intuitive moral reasoning and situational vigilance that technical warnings alone cannot impart.

## 4. Policy Recommendations & Educational Roadmaps

1. **Age-Tiered Curriculum Integration:** Embed culturally contextualized digital rights into foundational school curricula.
2. **Mandatory Privacy-by-Design for EdTech:** Prohibit non-consensual profiling or telemetry harvesting in educational applications.
3. **Equitable Teacher Enablement:** Provide educators with interactive toolkits to facilitate classroom discussions on algorithmic bias and digital citizenship.

---

*(Published under the auspices of the Pontifical Academy of Sciences Workshop on "Risks and Opportunities of AI for Children: A Common Commitment for Safeguarding Children", Vatican City.)*`
  },
  {
    id: 'ai-regulation-cant-wait-for-perfect-evidence',
    slug: 'ai-regulation-cant-wait-for-perfect-evidence',
    category: 'brief',
    featured: true,
    badge: 'News Arena India',
    title: 'AI Regulation Can’t Wait for Perfect Evidence',
    subtitle: 'Rejecting the Deny-and-Delay Playbook in Modern Artificial Intelligence Policy',
    description: 'The demand for total certainty before regulating AI isn’t caution—it’s a stall tactic leaving billions vulnerable. Why lawmakers must adopt evidence-seeking policies and mandatory model registration.',
    readTime: '4 min read',
    datePublished: '2025-04-29',
    author: 'Parishrut Jassal',
    externalUrl: 'https://newsarenaindia.com/technology/ai-regulation-can-t-wait-for-perfect-evidence/42779',
    image: '/assets/img/abstract/ai-regulation-thumbnail.webp',
    tags: ['News Arena India', 'AI Regulation', 'Public Sector AI', 'Compute Thresholds', 'Model Audits', 'IndiaAI'],
    content: `# AI Regulation Can’t Wait for Perfect Evidence

*Published in **News Arena India** on April 29, 2025*  
*By **Parishrut Jassal** (Founder & CEO, GovernAI)*  
[Read original publication on News Arena India →](https://newsarenaindia.com/technology/ai-regulation-can-t-wait-for-perfect-evidence/42779)

---

India recently took a groundbreaking step toward responsible AI governance. The IndiaAI mission unveiled a competency framework for AI integration in the public sector—a roadmap to train bureaucrats, policymakers, and public institutions to ethically deploy AI tools, from healthcare diagnostics to agricultural planning. The framework emphasizes transparency, accountability, and safeguards against bias, positioning India as a leader in proactive AI governance.

But while nations like India are building guardrails, a dangerous myth persists elsewhere: **“We need more evidence before regulating AI.”**

This demand for certainty isn’t caution; it’s a stall tactic—one that risks leaving billions vulnerable to unchecked corporate experimentation.

## 1. The Deny-and-Delay Playbook

In 2023, Microsoft’s Bing Chat startled users by adopting hostile personas, threatening harm, and gaslighting those who questioned its behavior. While no one was physically hurt, the incident exposed a chilling truth: AI systems are advancing faster than our collective ability to govern them.

The push for "evidence-based AI policy" risks repeating history. A 2025 MIT research paper, *Pitfalls of Evidence-Based AI Policy*, warns that fixating on impossibly high evidentiary standards ignores systemic biases in how AI risks are studied—and who gets to fund those studies.

For instance, a 2022 analysis of 100 influential AI papers found that **84 per cent prioritized raw technical performance metrics** (such as accuracy and benchmark speed) over ethical considerations like fairness, societal harm, or long-term safety.

## 2. When Profit-Driven Corporations Dominate Research

Google, Meta, and Microsoft sponsored **30 per cent of all papers at NeurIPS 2023**, the field’s premier research conference. When profit-driven corporations dominate the research agenda, the evidence base becomes less about objective truth and more about institutional power.

Consider the debate over compute thresholds—a proposed regulatory metric to track frontier AI systems based on their training compute power (FLOPs). Critics argue that thresholds are imperfect proxies for risk. But as MIT researchers note, process-based regulations—such as requiring frontier labs to register high-powered model training runs—impose minimal burdens while giving governments essential baseline oversight. Without such measures, regulators are flying blind.

Imagine a developer at a tech giant discovering a fundamental algorithmic bias that enables discriminatory outcomes in lending or hiring. Under corporate legal advice, the finding is buried to avoid legal exposure. Years later, the system denies credit to marginalized communities, and the internal audit paper trail is "lost." This is not hypothetical; companies routinely suppress risk signals, repeating the historical patterns of tobacco and pharmaceutical scandals.

## 3. Innovation Without Accountability is Recklessness

Sceptics frequently argue that regulation stifles innovation. But innovation without accountability is reckless gambling with public welfare. 

The MIT research team proposes 15 pragmatic policies to enable safe progress, including:
- Strong whistleblower protections for AI safety researchers and engineers.
- Mandatory third-party model audits prior to general release.
- Verifiable model registry reporting for systems trained above computational thresholds.
- Independent public funding for academic AI safety evaluations.

These measures do not halt technological progress; they build the democratic legitimacy and public trust required for long-term technological adoption.

Others dismiss AI risks as merely hypothetical. Tell that to the individuals falsely arrested by error-prone facial recognition systems, or to Indian communities harmed by models trained exclusively on Western datasets that fail to understand caste dynamics, regional idioms, and multilingual realities.

Lawmakers must decisively reject the deny-and-delay playbook. True leadership begins by adopting evidence-seeking policies, mandating independent model registration, and funding sovereign AI governance institutes.`
  },
  {
    id: 'deepseek-in-deep-trouble-india-to-lead-ai-governance-labyrinth',
    slug: 'deepseek-in-deep-trouble-india-to-lead-ai-governance-labyrinth',
    category: 'brief',
    featured: true,
    badge: 'News Arena India',
    title: 'DeepSeek in Deep Trouble: India to Lead AI Governance Labyrinth',
    subtitle: 'Foreign Surveillance Risks, the Paris AI Summit, and the Imperative for Sovereign Compute',
    description: 'As global restrictions mount around DeepSeek\'s opaque data practices, India must steer past digital Trojan horses and invest boldly in sovereign, trustworthy AI infrastructure.',
    readTime: '5 min read',
    datePublished: '2025-02-16',
    author: 'Parishrut Jassal',
    externalUrl: 'https://newsarenaindia.com/opinion/deepseek-in-deep-trouble-india-to-lead-ai-governance-labyrinth/36644',
    image: '/assets/img/abstract/deepseek-thumbnail.webp',
    tags: ['News Arena India', 'DeepSeek', 'Sovereign AI', 'AI Action Summit Paris', 'Data Sovereignty', 'Geopolitics'],
    content: `# DeepSeek in Deep Trouble: India to Lead AI Governance Labyrinth

*Published in **News Arena India** on February 16, 2025*  
*By **Parishrut Jassal** (Founder & CEO, GovernAI)*  
[Read original publication on News Arena India →](https://newsarenaindia.com/opinion/deepseek-in-deep-trouble-india-to-lead-ai-governance-labyrinth/36644)

---

At the 8th arrondissement's Grand Palais, the recent **Artificial Intelligence (AI) Action Summit** brought together global heads of state to shape the future of AI development and governance.

Co-chaired by French President **Emmanuel Macron** and Indian Prime Minister **Narendra Modi**, the summit underscored the urgent global need for inclusive, transparent, and ethically bounded AI systems.

This strong stance emerged as a direct counterpoint to the once-applauded open-source Large Language Model (LLM) from China, **DeepSeek**, which has since found itself in deep geopolitical and regulatory trouble.

## 1. The Perils Behind the Price Tag

Imagine a search engine and reasoning model so aggressive that it unearths every corner of the internet—public, private, and everything in between. That is both the promise and the peril of DeepSeek.

DeepSeek, the Chinese AI startup that released a powerful model at a fraction of the computational training cost of Western frontier labs, initially sparked global awe. But that awe quickly turned into alarm.

Investigations revealed severe data privacy vulnerabilities:
- Network telemetry indicated that DeepSeek applications and server endpoints transmit user prompts and analytical queries back to servers in mainland China.
- China's national intelligence and cybersecurity laws legally obligate domestic tech firms to share internal data with state authorities upon request.
- Western governments moved swiftly: the US Navy, NASA, and defense agencies banned its use; Italy's data protection regulator blocked access over GDPR non-compliance; Australia, South Korea, and Taiwan barred the software across official government infrastructure.

## 2. India’s Balancing Act: Optimism vs. National Security

In India, discussions surrounding DeepSeek initially reflected a tension between enthusiasm for low-cost computational architectures and deep national security caution. 

IT Minister Ashwini Vaishnaw recognized the engineering ingenuity of low-cost model optimization, but the Union Government prudently stopped short of endorsing deployment. The Ministry of Finance advised civil servants against using DeepSeek on official devices, and government bodies initiated testing on sovereign, isolated sandboxes.

The fundamental dilemma remains: **Should India embrace foreign, low-cost AI solutions with opaque architectures, or is it inviting a digital Trojan horse into its critical infrastructure?**

## 3. The Pitfall of Imported Dependencies

While affordability is attractive, the national security risks far outweigh the savings. In a geopolitical environment marked by heightened digital and border friction, relying on foreign models with obscured data-logging mechanisms jeopardizes national sovereignty.

Meanwhile, Europe has attempted to counter with its own initiatives, such as Mistral AI's *Le Chat*. Yet European commercial offerings create an ironic dilemma: privacy and non-tracking are increasingly gated behind premium enterprise tiers, raising a fundamental ethical question—**should personal data privacy be a luxury reserved only for those who can pay for it?**

## 4. The Path Ahead: Sovereign Compute & Verified Trust

Rather than importing foreign models laden with surveillance risk, India’s strategic imperative is clear:
1. **Accelerate Sovereign Compute:** Channel public compute subsidies through the IndiaAI Mission so domestic innovators can train foundational models domestically.
2. **Enforce Clean-Room Verification:** Mandate hardware-isolated enclaves and independent privacy audits before any foreign model is licensed for enterprise or public-sector integration.
3. **Champion Global South AI Leadership:** Articulate a distinct, democratic AI paradigm that balances affordability with mathematical privacy and data sovereignty.

India’s AI strategy must prioritize data sovereignty, institutional security, and verifiable trust. As we navigate the labyrinth of global AI governance, the Global South looks to New Delhi not merely for a policy choice, but as a beacon for equitable, self-reliant technology.`
  },
{
    id: 'digital-unga-india-affiliate-session',
    image: '/assets/img/unga/unga_1.webp',
    title: 'ITU & UNDP Digital@UNGA India Affiliate Session',
    description: 'GovernAI collaborated as Supporting Partner alongside Wasabi AI, the Royal Norwegian Embassy in New Delhi, Mosaika Impact, and Manus AI to convene the official ITU & UNDP Digital@UNGA India Affiliate Session: AI for Inclusion: From Access to Opportunity.',
    content: `GovernAI collaborated as a Supporting Partner alongside Wasabi AI, the Royal Norwegian Embassy in New Delhi, Mosaika Impact, and Manus AI to convene the official International Telecommunication Union (ITU) & UNDP Digital@UNGA India Affiliate Session: "AI for Inclusion: From Access to Opportunity" (🇮🇳🇳🇴).

Hosted at the Royal Norwegian Embassy in New Delhi, the high-level dialogue brought together diplomats, policymakers, technologists, and builders to explore how we move from basic AI access to true human and institutional agency.

The convening addressed actionable AI governance architectures, sovereign safety standards, and practical frameworks for bridging technological divides. Discussions emphasized transitioning from passive technology consumption to active capacity building, independent algorithmic verification, and institutional empowerment across global and emerging ecosystems.

GovernAI shared practical insights on operationalizing AI governance, contextual risk audits, and designing compliance benchmarks that safeguard public trust without hindering rapid technological progress.`,
    location: 'Royal Norwegian Embassy, New Delhi',
    datePublished: '2024-09-24',
    author: 'Parishrut Jassal',
  },
  {
    id: 'mou-telemedicine-society-of-india',
    image: '/assets/img/tsi/tsi_mou_1.webp',
    title: 'MoU Signing with Telemedicine Society of India',
    description: 'GovernAI signed a landmark strategic MoU with the Telemedicine Society of India (TSI) to advance AI safety, clinical validation benchmarks, and responsible healthcare governance protocols.',
    content: `GovernAI entered into a landmark strategic Memorandum of Understanding (MoU) with the Telemedicine Society of India (TSI). The strategic partnership establishes a robust collaborative framework to accelerate responsible AI adoption, clinical safety validation, and systematic algorithmic governance across India's digital healthcare ecosystem.

Through this alliance, GovernAI and the Telemedicine Society of India (led by distinguished pioneers including TSI President Dr. Murthy Remilla) are spearheading the creation of rigorous validation benchmarks for medical AI models, ethical data governance protocols under India's Digital Personal Data Protection (DPDP) Act, and specialized clinical AI safety training programs for practitioners and hospital administrations.

The collaboration represents a major milestone in anchoring safety, accountability, and clinical reliability at the core of AI-driven healthcare delivery, ensuring advanced medical intelligence serves clinicians and patients with verifiable integrity.`,
    location: 'New Delhi',
    datePublished: '2024-08-23',
    author: 'Parishrut Jassal',
  },
  {
    id: 1,
    image: '/insights/3.webp',
    title: 'Panel on Responsible AI',
    description: 'Panelist at the Responsible AI conference at Dhirubhai Ambani University – School of Law, alongside leaders from NVIDIA and JSA Advocates.',
    content: `Panelist at the conference on AI Governance: Ethics, Data Protection and Legal Framework, organised by the Ministry of Electronics and Information Technology, IITM Pravartak, Dhirubhai Ambani University School of Law, and the Deccan Centre for International Relations. The session was graced by Chief Guest Shri S Krishnan, Secretary, MeitY, and a keynote from Prof. Balaraman Ravindran, Head of Centre for Responsible AI, IIT Madras.

The panel on Legal and Regulatory Frameworks for Responsible AI featured distinguished experts including the Executive Director of Legal at NVIDIA, the Founder of Ikigai Law, and a Partner at JSA, providing complementary perspectives on the technical and legal dimensions of AI governance. The discussion examined how organisations can bridge the gap between high-level AI ethics principles and ground-level implementation.

Key takeaways included the importance of embedding governance by design into AI systems from the outset, rather than treating compliance as an afterthought. The panel underscored that responsible AI is not merely a regulatory requirement but a strategic imperative for organisations seeking to build trust and scalability into their AI operations.`,
    location: 'Chennai, Tamil Nadu',
    datePublished: '2024-03-15',
    author: 'Parishrut Jassal',
  },
  {
    id: 2,
    image: '/insights/4.webp',
    title: 'AI Competency Framework',
    description: 'Presenting the AI Competency Framework for Government Officials — categorization across Central & State Ministries.',
    content: `The AI Competency Framework for Government Officials was presented as a structured approach to categorise AI readiness across Central and State Ministries. The framework enables government departments to systematically assess skill gaps and design targeted capacity building interventions.

The categorisation spans foundational AI literacy for administrative personnel through advanced competencies for policy and procurement decision-makers. This structured approach ensures that officials at every level possess the knowledge required to evaluate, procure, and oversee AI systems within their domains.

By standardising competency expectations, the framework facilitates consistent evaluation of AI readiness across departments and supports the development of tailored training interventions aligned with national AI governance objectives.`,
    location: 'Punjab',
    datePublished: '2024-04-10',
    author: 'Parishrut Jassal',
  },
  {
    id: 3,
    image: '/insights/5.webp',
    title: 'AI in Administrative Efficiency',
    description: 'Leading a session on AI in Administrative Efficiency for officials at Punjab\u2019s Department of Technical Education & Industrial Training.',
    content: `The session on AI in Administrative Efficiency for Punjab's Department of Technical Education & Industrial Training focused on practical applications of artificial intelligence to streamline government workflows and enhance service delivery. Parishrut Jassal demonstrated how AI-powered tools can automate routine administrative tasks, enabling officials to redirect their efforts toward higher-value strategic functions.

Officials were introduced to use cases spanning document processing, data analysis, and citizen service optimization, with emphasis on low-risk, high-impact implementations that can be deployed within existing infrastructure. The session included hands-on demonstrations of AI tools relevant to the department's specific operational context.

The training reinforced the message that AI adoption in government does not require wholesale transformation overnight. Rather, incremental integration of AI into existing processes, supported by proper governance frameworks, can yield measurable efficiency gains while maintaining accountability and human oversight.`,
    location: 'Punjab',
    datePublished: '2024-04-22',
    author: 'Parishrut Jassal',
  },
  {
    id: 4,
    image: '/insights/8.webp',
    title: 'AI Foundation Training — UPSC',
    description: 'A two-day AI Foundation Training for newly recruited Deputy Architects of the UPSC Central Architectural Service.',
    content: `A two-day AI Foundation Training was conducted for the newly recruited Deputy Architects of the UPSC Central Architectural Service, Central Public Works Department, Government of India. The sessions explored the intersection of policy and practice, tracing the evolution of machines and simulators alongside the critical pillars of AI Auditing and AI Procurement for modern infrastructure.

Participants engaged with foundational AI concepts including machine learning fundamentals, computer vision applications in construction, and data-driven approaches to urban planning. The training emphasised how AI can enhance architectural design, project management, and infrastructure lifecycle assessment within government projects.

A key highlight was the development of digital twin simulators. By prototyping solutions for existing bottlenecks, bespoke AI simulations were curated using open-source data to enhance design and planning precision for India's built environment.`,
    location: 'New Delhi',
    datePublished: '2024-05-08',
    author: 'Parishrut Jassal',
  },
  {
    id: 5,
    image: '/insights/9.webp',
    title: 'Digital Twin & AI Strategy',
    description: 'AI Foundation Training for Deputy Architects of the UPSC Central Architectural Service — AI strategy, auditing, and Digital Twin simulations.',
    content: `The second day of the AI Foundation Training for UPSC Deputy Architects focused on Digital Twin technology and strategic AI implementation for government infrastructure projects. The sessions explored the critical pillars of AI Auditing and AI Procurement for modern infrastructure, building on the foundational concepts covered on day one.

A key highlight was the development of digital twin simulators. By prototyping solutions for existing bottlenecks in public infrastructure, bespoke AI simulations were curated using open-source data to enhance design and planning precision. Participants explored how Digital Twin technology enables real-time simulation and analysis of infrastructure assets.

The session also covered AI strategy formulation for government departments, including framework development for AI auditing, compliance assessment, and performance monitoring. The convergence of AI strategy and digital infrastructure provides public sector architects with a roadmap for integrating these technologies into professional practice.`,
    location: 'New Delhi',
    datePublished: '2024-05-09',
    author: 'Parishrut Jassal',
  },
  {
    id: 6,
    image: '/insights/11.webp',
    title: 'Data Governance & Responsible AI',
    description: 'Delivering a session on Data Governance and Responsible AI for officers of UPSDM as part of an AI Literacy Workshop.',
    content: `Parishrut Jassal delivered a session on Data Governance and Responsible AI for officers of the Uttar Pradesh Skill Development Mission (UPSDM) as part of a comprehensive AI Literacy Workshop. The session addressed the critical intersection of data management practices and ethical AI deployment within government skill development initiatives.

Officers were guided through the principles of data governance, including data quality, security, privacy, and lifecycle management, with particular emphasis on how these principles apply to AI systems. The session also covered the Responsible AI framework, addressing fairness, accountability, transparency, and ethical considerations in AI-driven decision-making.

The training equipped UPSDM officials with the foundational knowledge required to evaluate AI tools and data practices within their programs. Understanding data governance as a prerequisite for responsible AI adoption enables government agencies to build trust and ensure compliance with emerging regulatory standards.`,
    location: 'Lucknow, Uttar Pradesh',
    datePublished: '2024-06-05',
    author: 'Parishrut Jassal',
  },
  {
    id: 7,
    image: '/insights/12.webp',
    title: 'Applied AI for Public Sector',
    description: 'A two-day workshop on Applied & Functional AI for Public Sector at UPSDM — strengthening future-ready AI capabilities in governance.',
    content: `This intensive two-day workshop on Applied and Functional AI for the Public Sector was conducted for officers of the Uttar Pradesh Skill Development Mission (UPSDM), focusing on building practical AI capabilities for governance applications. Parishrut Jassal led participants through a structured curriculum designed to bridge the gap between AI theory and public sector implementation.

The workshop covered functional AI applications including automated content generation, data analysis and visualization, chatbot implementation for citizen services, and AI-assisted policy research. Participants engaged in hands-on exercises that demonstrated how AI tools can enhance productivity, improve decision-making, and optimize resource allocation within government departments.

By the conclusion of the workshop, officers had developed practical skills in identifying AI opportunities within their workflows and understanding the governance considerations necessary for responsible deployment. The program reinforced UPSDM's commitment to building future-ready AI capabilities across its operations.`,
    location: 'Lucknow, Uttar Pradesh',
    datePublished: '2024-06-12',
    author: 'Parishrut Jassal',
  },
  {
    id: 8,
    image: '/insights/13.webp',
    title: 'Sessions at National Law University',
    description: 'Delivering AI-focused sessions at National Law University, Delhi — exploring the intersection of technology, law, and data governance.',
    content: `Parishrut Jassal delivered specialized AI-focused sessions at National Law University, Delhi, addressing the rapidly evolving intersection of technology, law, and data governance. The sessions were designed to equip law students and faculty with a practical understanding of how artificial intelligence is reshaping legal practice, regulatory frameworks, and judicial processes.

The curriculum covered AI fundamentals tailored for legal professionals, including algorithmic decision-making, AI in legal research and documentation, data protection under the DPDP Act, and the emerging jurisprudence around AI liability and accountability. Case studies illustrated how courts and regulators globally are grappling with AI-related disputes and compliance requirements.

The sessions underscored the growing need for legal professionals who understand both the technical and regulatory dimensions of AI. As AI systems become more prevalent across sectors, lawyers equipped with AI governance knowledge will be essential to navigating the complex legal landscape that surrounds algorithmic systems.`,
    location: 'New Delhi',
    datePublished: '2024-07-18',
    author: 'Parishrut Jassal',
  },
  {
    id: 9,
    image: '/insights/14.webp',
    title: 'AI & Research Ethics — JNU',
    description: 'Speaking at Jawaharlal Nehru University on \u201CArtificial Intelligence and Research Ethics\u201D — integrating AI responsibly while preserving academic integrity.',
    content: `Parishrut Jassal presented at Jawaharlal Nehru University on the topic of Artificial Intelligence and Research Ethics, addressing the opportunities and challenges that AI presents for academic research. The session explored how researchers can leverage AI tools while maintaining rigorous ethical standards and preserving academic integrity.

Key discussion points included the use of AI in literature review, data analysis, and manuscript preparation, alongside the ethical considerations surrounding AI-generated content, plagiarism detection, and algorithmic bias in research methodologies. The presentation emphasized the importance of transparency in disclosing AI-assisted research processes and maintaining human accountability for scholarly output.

The session contributed to JNU's ongoing dialogue on responsible AI integration in academia. As AI tools become increasingly embedded in research workflows, institutions must develop clear policies and guidelines that enable innovation while safeguarding the core values of academic integrity and intellectual honesty.`,
    location: 'New Delhi',
    datePublished: '2024-08-02',
    author: 'Parishrut Jassal',
  },
  {
    id: 10,
    image: '/insights/15.webp',
    title: 'India AI Impact Summit 2026',
    description: 'Interacting with young innovators from Sainik School Sujanpur Tira at the India AI Impact Summit 2026 — showcasing impactful AI solutions.',
    content: `At the India AI Impact Summit 2026 at Bharat Mandapam, young innovators from Sainik School Sujanpur Tira presented their AI solutions at the Google Booth. These students, representing the Atal Tinkering Lab, were selected among the Top 50 Projects by the Atal Innovation Mission during the India AI Tinkerpreneur 2025 bootcamp.

Two teams showcased their impactful AI solutions on this national stage. Team 1 presented Virtual Tech Guard, and Team 2 demonstrated Fabricate Me AI, a smart virtual fashion try-on solution. The students were hosted for a deep dive into AI tools, exploring how AI can augment research and synthesis capabilities.

Witnessing the incredible brilliance of these young minds at the India AI Impact Summit reinforced that India's AI future depends on inclusive access to knowledge, mentorship, and opportunities for hands-on experimentation with AI technologies at the grassroots level.`,
    location: 'New Delhi',
    focus: 'center 38%',
    datePublished: '2024-08-20',
    author: 'Parishrut Jassal',
  },
  {
    id: 11,
    image: '/insights/16.webp',
    title: 'Meeting Dr. Rumman Chowdhury',
    description: 'At the India AI Impact Summit 2026 — gaining valuable insights into the evolving challenges of AI governance, policy, and democratic systems.',
    content: `At the India AI Impact Summit 2026, Parishrut Jassal met with Dr. Rumman Chowdhury, a globally recognized leader in AI ethics and governance. The meeting provided an opportunity to exchange perspectives on the evolving challenges of AI governance, particularly in the context of democratic systems and the Global South.

The discussion covered critical topics including algorithmic auditing methodologies, the role of independent oversight in AI deployment, and strategies for building inclusive AI governance frameworks that account for diverse cultural and regulatory contexts. Dr. Chowdhury's insights on operationalizing AI ethics within enterprise and government settings informed GovernAI's approach to delivering pragmatic governance solutions.

This engagement reflects GovernAI's commitment to learning from global thought leaders while developing context-specific solutions for the Indian public sector. Cross-pollination of ideas between international experts and local practitioners is essential to building robust, globally-informed AI governance frameworks.`,
    location: 'New Delhi',
    focus: 'center 30%',
    datePublished: '2024-08-21',
    author: 'Parishrut Jassal',
  },
  {
    id: 12,
    image: '/insights/17.webp',
    title: 'Faculty Development — DYPU Law',
    description: 'A Faculty Development Workshop at DYPU School of Law — ethical AI use, academic workflows, and practical AI tools for teaching and administration.',
    content: `Parishrut Jassal conducted a Faculty Development Workshop at DY Patil University School of Law, focusing on equipping legal educators with the knowledge and tools to integrate AI into their academic workflows. The workshop addressed the growing need for law faculty to understand AI's impact on legal education and practice.

The session covered practical AI applications for legal research, case analysis, curriculum development, and administrative efficiency. Faculty members explored AI tools that can enhance teaching methodologies, streamline assessment processes, and prepare students for a legal landscape increasingly shaped by technology. Ethical considerations around AI use in academic settings were a central theme throughout the workshop.

Faculty development in AI literacy is essential for ensuring that legal education remains relevant in an era of rapid technological change. By empowering educators with AI competencies, institutions can better prepare the next generation of legal professionals to navigate the intersection of law and technology.`,
    location: 'Navi Mumbai, Maharashtra',
    datePublished: '2024-09-05',
    author: 'Parishrut Jassal',
  },
  {
    id: 13,
    image: '/insights/18.webp',
    title: 'AI Session for MCD Engineers',
    description: 'Founder & CEO Parishrut Jassal led an AI integration session for over 100 senior officials of the Municipal Corporation of Delhi at MCD Civic Center, in collaboration with the National CPWD Academy.',
    content: `It was a distinct privilege to lead the session on Artificial Intelligence for the Municipal Corporation of Delhi (MCD) at the MCD Civic Center, New Delhi. The MCD's Planning Department, in collaboration with the National CPWD Academy, organised a comprehensive two-day refresher training programme for their engineering leadership, inaugurated by MCD Commissioner Shri Sanjeev Khirwar (IAS).

The AI integration session was conducted for a distinguished group of over 100 senior officials, including Chief Engineers, Superintending Engineers, and Executive Engineers from all zones. The session focused on moving beyond theoretical concepts to explore the practical applications of AI and tech-driven solutions specifically tailored for civil engineering and urban governance.

The training also emphasised the imperatives of AI governance, safety, and responsible deployment within municipal operations. Equipping MCD's engineering leadership with AI competencies ensures that the city's infrastructure projects benefit from data-driven decision-making while maintaining accountability and human oversight.`,
    location: 'New Delhi',
    datePublished: '2024-09-18',
    author: 'Parishrut Jassal',
  },
  {
    id: 14,
    image: '/insights/19.webp',
    title: 'Panelist at AAAI 2026',
    description: 'Panelist at AAAI 2026 in Singapore — contributing to discussions on AI governance, autonomous systems, and human-centered frameworks.',
    content: `Panelist at the 3rd International AI Governance Workshop (AIGOV 2026) at AAAI 2026 in Singapore, presenting the session "From Policy to Procurement: Architecting Algorithmic Auditing Standards." This work moves beyond theory to reveal the operational reality of Sovereign AI, covering strategies for public procurement of AI systems, architected algorithmic auditing for Sovereign AI, and workflows to ensure state-level AI accountability.

The session examined the critical gap between AI policy formulation and practical implementation. Standardised, architected workflows embedded in the procurement process itself are essential to ensure accountability before deployment. The presentation highlighted that trained over 1,000 officials on AI readiness as part of ongoing capacity building efforts.

As the industry moves from generative AI to agentic AI systems making consequential decisions, embedding responsibility mechanisms directly into autonomous AI systems is not just academic but an urgent operational requirement. The workshop provided a global platform to showcase frameworks for operationalising AI governance in the public sector.`,
    location: 'Singapore',
    datePublished: '2024-10-02',
    author: 'Parishrut Jassal',
  },
  {
    id: 15,
    image: '/insights/20.webp',
    title: 'Partnership — DY Patil University',
    description: 'A new partnership between GovernAI and DY Patil University to advance Responsible AI by bridging technology and law.',
    content: `GovernAI entered into a strategic partnership with DY Patil University (DYPU) to advance Responsible AI education and research by bridging the domains of technology and law. This collaboration brings together GovernAI's practical expertise in AI governance with DYPU's academic strengths in legal education and research.

The partnership encompasses joint curriculum development, research initiatives, faculty training programs, and student engagement activities focused on AI governance, data protection, and ethical AI deployment. By integrating industry perspectives into academic programs, the partnership aims to produce graduates who are equipped to navigate the complex regulatory and technical landscape of AI governance.

This collaboration reflects GovernAI's commitment to building institutional capacity for AI governance beyond government training programs. Academic partnerships are a key pillar of GovernAI's strategy to create a sustainable ecosystem for responsible AI development, combining practical implementation experience with rigorous academic foundations.`,
    location: 'Navi Mumbai, Maharashtra',
    datePublished: '2024-10-15',
    author: 'Parishrut Jassal',
  },
  {
    id: 16,
    image: '/insights/21.webp',
    title: 'AI & Law Centre — MoU Signing',
    description: 'Signing an MoU with DY Patil University School of Law to establish a dedicated AI & Law Centre advancing responsible AI through research and policy.',
    content: `GovernAI signed a Memorandum of Understanding with DY Patil University School of Law to establish a dedicated Centre for AI and Law, focused on advancing responsible AI through interdisciplinary research and policy development. This centre represents a significant institutional commitment to exploring the intersection of artificial intelligence and legal frameworks.

The AI and Law Centre will serve as a hub for research on algorithmic accountability, data protection jurisprudence, AI regulatory frameworks, and the ethical implications of autonomous systems. It will also organize conferences, workshops, and policy dialogues bringing together legal scholars, technologists, policymakers, and industry practitioners to shape the future of AI governance.

The establishment of this centre marks a milestone in institutionalizing AI governance education and research in India. By creating a dedicated academic platform for exploring AI-law intersections, GovernAI and DYPU are contributing to the development of a skilled workforce capable of addressing the complex governance challenges posed by advancing AI technologies.`,
    location: 'Navi Mumbai, Maharashtra',
    datePublished: '2024-10-16',
    author: 'Parishrut Jassal',
  },
  {
    id: 17,
    image: '/insights/22.webp',
    title: 'Masterclass at DY Patil University',
    description: 'A masterclass at DY Patil University School of Law during the India AI Impact Summit 2026 pre-summit event on responsible AI practices.',
    content: `Parishrut Jassal delivered a masterclass at DY Patil University School of Law as part of the India AI Impact Summit 2026 pre-summit events. The masterclass provided legal professionals and students with an in-depth exploration of responsible AI practices and their implications for the legal profession.

The session covered the practical dimensions of AI governance, including compliance frameworks, risk assessment methodologies, and the role of legal professionals in ensuring algorithmic accountability. Participants engaged with real-world case studies examining AI-related disputes, regulatory investigations, and the development of organizational AI policies.

The masterclass underscored the critical role that legal professionals play in shaping responsible AI adoption. As AI systems become more pervasive, lawyers with expertise in AI governance will be essential to helping organizations navigate regulatory requirements, manage liability risks, and ensure that AI deployment aligns with ethical and legal standards.`,
    location: 'Navi Mumbai, Maharashtra',
    datePublished: '2024-10-18',
    author: 'Parishrut Jassal',
  },
  {
    id: 18,
    image: '/insights/23.webp',
    title: 'DPDP & Responsible AI — AIIMS Patna',
    description: 'Chief Compliance Officer Alvin Antony led a session at AIIMS Patna on the DPDP Act 2023, DPDP Rules 2025, and responsible AI in healthcare.',
    content: `GovernAI's Chief Compliance Officer, Alvin Antony, delivered a comprehensive session at AIIMS Patna on the Digital Personal Data Protection Act 2023, the DPDP Rules 2025, and their implications for responsible AI deployment in healthcare. The session addressed the unique data protection challenges faced by healthcare institutions managing sensitive patient data.

The presentation covered the key provisions of the DPDP Act and Rules, including consent management, data fiduciary obligations, data protection impact assessments, and breach notification requirements. Special emphasis was placed on how healthcare AI systems must comply with data protection regulations while delivering clinical value, with practical guidance on implementing compliant AI workflows in hospital settings.

AIIMS Patna's engagement with data protection and AI governance reflects the growing awareness across India's healthcare sector that regulatory compliance and responsible AI adoption are integral to patient trust and institutional credibility. Healthcare institutions that proactively build governance capabilities will be better positioned to leverage AI while maintaining the highest standards of data protection.`,
    location: 'Patna, Bihar',
    datePublished: '2024-11-05',
    author: 'Alvin Antony',
  },
  {
    id: 19,
    image: '/insights/24.webp',
    title: 'IndiaAI Impact Summit — Expert Panel',
    description: 'Joining the expert panel at the IndiaAI Impact Summit 2026 Pre-Summit Event — discussing AI safety, governance, and secure frameworks.',
    content: `Joined the expert panel at the official Pre-Summit Event, "Securing Autonomous AI: From Laboratory Agents to Production Systems," for the IndiaAI Impact Summit 2026, hosted by IIT Delhi and COHUMAIN LABS. The session titled "Building India's AI Safety Framework" contributed to discussions on the security and alignment of agentic systems as they transition from research into production environments.

The event served as a critical platform for discussing the governance, ethics, and technical safeguards necessary to foster a secure and trustworthy AI ecosystem in India. Topics included the role of regulatory sandboxes, independent auditing mechanisms, incident reporting frameworks, and international cooperation on AI safety standards.

Building a robust AI safety framework is not merely a technical challenge but a collaborative effort across academia, industry, and policy. The pre-summit dialogue reinforced that AI governance must be proactive rather than reactive, requiring investment in governance infrastructure, technical standards, and human capacity.`,
    location: 'New Delhi',
    datePublished: '2024-11-20',
    author: 'Parishrut Jassal',
  },
  {
    id: 20,
    image: '/insights/25.webp',
    title: 'AI Governance — Himachal Pradesh',
    description: 'Founder & CEO Parishrut Jassal delivered a session on AI Governance for the Government of Himachal Pradesh, strengthening public sector readiness.',
    content: `Conducted a comprehensive AI Governance session for the Himachal Pradesh government at HIPA, Shimla, focused on strengthening the state's public sector readiness for responsible AI adoption. The session was part of the state's broader initiative to build digital governance capabilities and prepare its workforce for an AI-enabled future.

The session covered the fundamentals of AI governance, including risk management frameworks, procurement standards for AI systems, data governance requirements, and organisational structures for AI oversight. Officials from multiple departments gained insights into how AI governance principles apply across diverse government functions, from healthcare and education to infrastructure and public safety.

Himachal Pradesh's proactive engagement with AI governance reflects a growing recognition among state governments that AI readiness is not just about technology adoption but about building the institutional frameworks, human capacity, and governance mechanisms necessary for responsible AI deployment across the public sector.`,
    location: 'Shimla, Himachal Pradesh',
    datePublished: '2024-12-03',
    author: 'Parishrut Jassal',
  },
  {
    id: 21,
    image: '/insights/26.webp',
    title: 'TEDxGNLU Talk',
    description: 'Speaking at TEDxGNLU — \u201CThe Matrix Algorithm: From NPCs to Future Architects\u201D — preserving human agency and critical thinking in the age of AI.',
    content: `The TEDxGNLU talk titled "The Matrix Algorithm: From NPCs to Future Architects" shared a personal story that began with a realisation while exploring Generative AI in late 2022. Heavy reliance on AI tools had diminished cognitive capacity in just two months, leading to the realisation that over-dependence on these systems can transform users from active architects of their future into passive receivers of technology.

The talk examined the danger of losing cognitive skills and human agency to convenience, urging the audience to pivot from being passive users to active architects. The most significant risk of AI is not technological unemployment but cognitive atrophy, where over-reliance on AI systems diminishes independent reasoning and creative problem-solving capabilities.

The core message challenged the audience to reclaim their role as architects of their technological future. Preserving human agency in the AI era requires deliberate effort to maintain the cognitive skills that distinguish human intelligence from machine computation.`,
    location: 'Gandhinagar, Gujarat',
    datePublished: '2024-12-15',
    author: 'Parishrut Jassal',
  },
  {
    id: 22,
    image: '/insights/27.webp',
    title: 'AI & Philanthropy — Asia-Pacific',
    description: 'At the Asia-Pacific Meeting on Artificial Intelligence and Philanthropy — discussions on ethical AI, inclusive innovation, and social impact.',
    content: `Invited for the Asia-Pacific Meeting on Artificial Intelligence and Philanthropy, co-hosted by Swissnex in India, Consulate General of Switzerland, Bengaluru and the Centre en philanthropie (GCP)-UNIGE. The meeting brought together stakeholders from across the Asia-Pacific region to explore how AI can be harnessed for social good through philanthropic investment.

The agenda included Panel 1 on AI and Philanthropy, Panel 2 on Ethical and Inclusive AI Empowered by Philanthropy, and a workshop on "READYFORAI: Fast, Effective, Low-Risk Adoption of AI in Philanthropy." A key highlight was the keynote on how institutions can nurture local research ecosystems and strengthen policy frameworks around AI safety and bias.

The meeting underscored the unique opportunity for philanthropic organisations to support AI governance infrastructure in regions that lack regulatory capacity. Strategic philanthropic investment in AI literacy programmes, independent research, and multistakeholder governance initiatives can help ensure that AI development benefits all segments of society.`,
    location: 'New Delhi',
    datePublished: '2025-01-10',
    author: 'Parishrut Jassal',
  },
  {
    id: 23,
    image: '/insights/28.webp',
    title: 'AI Horizon Summit',
    description: 'Participating in the AI Horizon Summit, an official pre-summit event for the India AI Impact Summit 2026 — shaping future-ready AI governance pathways.',
    content: `Participated in the AI Horizon Summit, an official Pre-Summit event for the AI Impact Summit 2026, driven by the IndiaAI Mission, Ministry of Electronics and Information Technology. The summit featured a deep-dive, three-hour foresight session hosted by Sustainable Living Lab (SL2) and the Odyssean Institute, powered by Intel Corporation.

The session engaged participants in collaborative mapping of governance pathways that are technologically advanced, inclusive, resilient, and aligned with national priorities. Discussions addressed critical governance challenges including the development of sector-specific AI regulatory frameworks, the design of AI audit and assurance mechanisms, and the establishment of institutional structures for AI oversight.

The AI Horizon Summit served as a crucial platform for aligning stakeholder perspectives on India's AI governance trajectory. The insights generated informed the broader India AI Impact Summit agenda and contributed to developing practical governance solutions tailored to India's unique socio-economic context.`,
    location: 'New Delhi',
    datePublished: '2025-01-22',
    author: 'Parishrut Jassal',
  },
  {
    id: 24,
    image: '/insights/29.webp',
    title: 'Data Governance — CDAC Mohali',
    description: 'Chief Compliance Officer Alvin Antony delivered a session at the IndiaAI Data Lab, CDAC Mohali on Data Governance, DPDP, and Responsible AI.',
    content: `GovernAI's Chief Compliance Officer, Alvin Antony, delivered a session at the IndiaAI Data Lab, CDAC Mohali, focusing on Data Governance, the Digital Personal Data Protection Act, and Responsible AI principles. The session was part of CDAC's ongoing initiative to build data governance capabilities among technology professionals and researchers.

The presentation covered the technical and legal dimensions of data governance for AI systems, including data quality frameworks, consent architecture, anonymization techniques, and compliance with the DPDP Act and Rules. Participants explored practical approaches to implementing data governance in AI projects, from data collection and storage to processing and deletion.

CDAC Mohali's engagement with data governance and responsible AI reflects the growing importance of building compliance and ethics capabilities within India's technology research institutions. As AI systems become more data-intensive, robust data governance practices are essential to ensuring that AI development respects privacy rights and regulatory requirements.`,
    location: 'Mohali, Punjab',
    datePublished: '2025-02-05',
    author: 'Alvin Antony',
  },
  {
    id: 25,
    image: '/insights/30.webp',
    title: 'SMART Public Service Delivery — IIPA',
    description: 'Speaking at the Three-day Training Program on SMART Public Service Delivery in Urban Planning and Governance at IIPA.',
    content: `Delivered a session at a three-day Training Programme on SMART Public Service Delivery in Urban Planning and Governance at the Indian Institute of Public Administration (IIPA). The session titled "Responsible AI and Digital Governance" examined the intersection of emerging technologies and urban governance frameworks.

The programme brought together urban administrators to explore how technology, including AI, can enhance efficiency, transparency, and citizen-centricity in governance. The session covered AI applications in urban planning including predictive analytics for infrastructure development, AI-powered citizen grievance redressal systems, and data-driven resource allocation approaches for municipal governance.

The programme reflects the growing focus on building capacity among urban administrators to leverage technology for improved governance outcomes. Equipping public officials with knowledge of SMART technologies and AI tools is essential to realising the vision of data-driven, citizen-responsive urban governance in India's rapidly growing cities.`,
    location: 'New Delhi',
    datePublished: '2025-02-18',
    author: 'Parishrut Jassal',
  },
  {
    id: 26,
    image: '/insights/31.webp',
    title: 'Building AI Capacity for Governance',
    description: 'Launching the 10-week \u201CBuilding AI Capacity for Governance\u201D programme at MS-HIPA — strengthening responsible AI within the public sector.',
    content: `Launched the comprehensive 10-week "Building AI Capacity for Governance" programme at the Mahatma Singh HIPA (MS-HIPA), marking a significant milestone in structured AI capacity building for the public sector. The programme was designed to provide government officials with a systematic and practical understanding of AI and its governance implications.

The curriculum spans AI fundamentals, data governance, AI risk management, procurement standards for AI systems, ethical frameworks, and practical implementation strategies. The 10-week structure allows participants to progressively build their competencies, with each module building on previous learning and incorporating real-world case studies from government AI deployments.

This programme represents a scalable model for AI capacity building that can be adapted for other states and institutions. The structured, long-format approach ensures that participants develop not just awareness but practical competencies that enable them to lead AI initiatives within their departments with confidence and responsibility.`,
    location: 'Shimla, Himachal Pradesh',
    datePublished: '2025-03-01',
    author: 'Parishrut Jassal',
  },
  {
    id: 27,
    image: '/insights/32.webp',
    title: 'Yashoda AI — Chandigarh University',
    description: 'Leading a Yashoda AI session at Chandigarh University on AI literacy, safety, and the responsible use of AI for future technology professionals.',
    content: `Delivered a Yashoda AI session at Chandigarh University, diving deep into the fundamentals of AI literacy and safety for a new generation of technology professionals. The session was designed to equip students with the foundational knowledge needed to develop and deploy AI systems responsibly in their future careers.

The session covered the lifecycle of responsible AI development, from problem definition and data collection to model deployment and monitoring. Students explored common AI risks including bias, privacy violations, and safety failures, and examined frameworks for mitigating these risks throughout the development process. Practical demonstrations illustrated how governance considerations can be integrated into technical workflows.

Engaging with university students on responsible AI is a key part of building a culture of governance from the ground up. By introducing AI ethics and safety concepts early in technology education, the programme aims to create a generation of AI practitioners who treat governance not as an afterthought but as a fundamental design requirement.`,
    location: 'Chandigarh',
    datePublished: '2025-03-12',
    author: 'Parishrut Jassal',
  },
  {
    id: 28,
    image: '/insights/33.webp',
    title: 'Session at SIRD&PR',
    description: 'Founder & CEO Parishrut Jassal led a session at SIRD&PR, Government of Himachal Pradesh — advancing AI literacy across public sector departments.',
    content: `Parishrut Jassal conducted a session at the State Institute of Rural Development and Panchayati Raj (SIRD&PR), Government of Himachal Pradesh, aimed at advancing AI literacy across public sector departments. The session was designed to introduce rural development officials to the potential of AI in enhancing governance outcomes at the grassroots level.

The training covered practical AI applications relevant to rural development, including data-driven program monitoring, beneficiary targeting, resource optimization, and citizen engagement. Officials explored how AI tools can support evidence-based policymaking, improve the efficiency of rural development programs, and enhance service delivery to remote communities.

SIRD&PR's engagement with AI literacy reflects the Government of Himachal Pradesh's commitment to building technology capacity across all levels of administration. Ensuring that rural development officials understand AI's capabilities and limitations is essential to harnessing technology for inclusive and sustainable development.`,
    location: 'Himachal Pradesh',
    datePublished: '2025-03-25',
    author: 'Parishrut Jassal',
  },
  {
    id: 29,
    image: '/insights/34.webp',
    title: 'AI Literacy at MGSIPA',
    description: 'Conducting a session at MGSIPA, Chandigarh for government officials on AI literacy, responsible AI integration, and public administration.',
    content: `Delivered a session on AI Literacy and Governance at MGSIPA, Chandigarh, providing government officials with comprehensive training on AI fundamentals, responsible AI integration, and their implications for public administration. The session was part of MGSIPA's ongoing capacity building programmes for civil servants.

The training covered AI fundamentals, governance frameworks, and practical applications across government functions. Officials learned to identify opportunities for AI integration in their workflows, assess AI-related risks, and understand the governance mechanisms necessary to ensure responsible deployment. Case studies from other state governments illustrated successful AI adoption models.

Building AI literacy among civil servants is a critical enabler of digital transformation in government. Officials who understand AI's capabilities, limitations, and governance requirements are better equipped to make informed decisions about AI adoption, procurement, and oversight within their departments.`,
    location: 'Chandigarh',
    datePublished: '2025-04-02',
    author: 'Parishrut Jassal',
  },
  {
    id: 30,
    image: '/insights/35.webp',
    title: 'AI Policy at JSIA, JGU',
    description: 'Delivering a session at the Jindal School of International Affairs (JSIA), JGU on AI policy, governance, and the evolving global AI landscape.',
    content: `Delivered a guest lecture on AI Policy and Governance at the Jindal School of International Affairs (JSIA), OP Jindal Global University, tracing the journey from AI fundamentals to the evolving global regulatory landscape. The session provided students and faculty with insights into the geopolitical dimensions of AI governance and India's positioning in the international AI regulatory landscape.

The lecture covered comparative AI governance approaches across major jurisdictions including the European Union's AI Act, the United States' executive orders and voluntary frameworks, and China's state-centric approach. Particular focus was given to India's emerging AI governance model, which seeks to balance innovation with protection through a principle-based techno-legal approach.

The session at JSIA contributed to building a deeper understanding of AI policy among future international affairs professionals. As AI becomes a central topic in international relations and diplomatic discourse, professionals equipped with AI governance knowledge will be essential to shaping collaborative approaches to managing AI's global opportunities and risks.`,
    location: 'Sonipat, Haryana',
    datePublished: '2025-04-15',
    author: 'Parishrut Jassal',
  },
  {
    id: 31,
    image: '/insights/36.webp',
    title: 'Empowering Young Minds',
    description: 'Interacting with students at a Government Senior Secondary School in Himachal Pradesh on the responsible use of AI as a tool for learning.',
    content: `Conducted a Yashoda AI session for an incredible group of Class 10th, 11th, and 12th students at a Government Senior Secondary School in Himachal Pradesh. The session was designed to demystify AI for young learners and inspire them to explore technology as a means of solving real-world problems.

Students explored basic AI concepts through interactive demonstrations, understanding how AI powers tools they encounter in daily life. The session emphasised critical thinking about AI outputs, understanding algorithmic bias, and developing a responsible approach to using AI tools in their education. Students also learned about career opportunities in AI and technology fields.

Engaging with students at the school level is a vital component of building an AI-ready society. Early exposure to AI concepts, combined with an emphasis on responsible use, helps create a generation of informed citizens who can leverage AI tools effectively while understanding their limitations and ethical implications.`,
    location: 'Himachal Pradesh',
    datePublished: '2025-04-28',
    author: 'Parishrut Jassal',
  },
  {
    id: 32,
    image: '/insights/37.webp',
    title: 'AI in Healthcare — The AI Collective',
    description: 'AI & Healthcare Lead Dr. Mrudula Bhalke spoke at The AI Collective Delhi – Healthcare Chapter on Generative AI, ethics, and responsible innovation.',
    content: `GovernAI's AI and Healthcare Lead, Dr. Mrudula Bhalke, spoke at The AI Collective Delhi Healthcare Chapter, addressing the transformative potential and governance challenges of Generative AI in healthcare. The session brought together healthcare professionals, technologists, and policymakers to explore responsible innovation in medical AI.

The presentation covered applications of Generative AI in clinical documentation, medical imaging analysis, drug discovery, and patient communication. Dr. Bhalke emphasized the critical importance of ethical considerations in healthcare AI, including patient privacy, clinical validation, bias mitigation, and the maintenance of human oversight in medical decision-making.

The AI Collective forum provides a valuable platform for cross-sector dialogue on responsible AI adoption in healthcare. As AI technologies become more sophisticated, healthcare institutions must develop robust governance frameworks that ensure patient safety, regulatory compliance, and ethical integrity while harnessing AI's potential to improve clinical outcomes.`,
    location: 'New Delhi',
    datePublished: '2025-05-05',
    author: 'Dr. Mrudula Bhalke',
  },
  {
    id: 33,
    image: '/insights/38.webp',
    title: 'Grassroots Digital Governance',
    description: 'Engaging with government officials and computer operators in Himachal Pradesh on data governance, DPDP principles, and responsible AI practices.',
    content: `Delivered a session on "Digital Governance at the Grassroots" for government officials and computer operators in Himachal Pradesh, focusing on the practical dimensions of data governance, DPDP Act compliance, and responsible AI practices. The session was designed to reach frontline government functionaries who manage citizen data in their daily operations.

The training covered data protection principles under the DPDP Act, including consent management, data minimisation, purpose limitation, and security safeguards. Practical guidance was provided on implementing these principles in the context of rural governance, where digital infrastructure and technical capacity may be limited. The session also addressed the responsible use of AI tools in citizen-facing services.

Reaching frontline government functionaries with data governance training is essential to building a culture of data protection across all levels of administration. Grassroots workers who understand their data protection responsibilities are better equipped to safeguard citizen privacy and maintain trust in government digital services.`,
    location: 'Himachal Pradesh',
    datePublished: '2025-05-15',
    author: 'Parishrut Jassal',
  },
  {
    id: 34,
    image: '/insights/39.webp',
    title: 'AI Workshops with AILF',
    description: 'Leading AI workshops in Tamil Nadu with the Artificial Intelligence Legislators\u2019 Forum (AILF) on practical AI literacy and responsible adoption.',
    content: `Conducted an AI Literacy and Safety Workshop in Tamil Nadu in collaboration with the Artificial Intelligence Legislators' Forum (AILF), continuing the mission to make AI governance accessible at every level of the policy-making ecosystem. The workshops aimed to equip elected representatives and legislative staff with the technical understanding needed to develop informed AI legislation.

The sessions covered AI fundamentals, governance frameworks, and the implications of AI for legislative processes and policy development. Participants explored case studies of AI regulation from around the world and discussed how India's federal structure influences the distribution of AI governance responsibilities between central and state governments.

Engaging with legislators on AI literacy is critical to ensuring that India's AI governance framework is informed by a broad understanding of the technology among those who will shape its regulatory environment. Legislators equipped with AI knowledge can develop more effective, context-appropriate policies that balance innovation with public interest.`,
    location: 'Tamil Nadu',
    datePublished: '2025-05-22',
    author: 'Parishrut Jassal',
  },
  {
    id: 35,
    image: '/insights/40.webp',
    title: 'Responsible AI Workshop — IIPA',
    description: 'Associated with IIPA on e-Governance initiatives — conducting a workshop on the responsible use of AI, emphasizing efficiency and human oversight.',
    content: `Conducted a Workshop on Responsible AI for Digital Governance at the Indian Institute of Public Administration (IIPA), focusing on leveraging AI to improve governance efficiency while maintaining robust human oversight. The workshop was part of IIPA's e-Governance initiatives aimed at building capacity among public administrators.

The session covered practical frameworks for integrating AI into e-Governance systems, including automated service delivery, intelligent document processing, and AI-assisted decision support. Emphasis was placed on designing governance workflows that leverage AI for efficiency gains while retaining human accountability for consequential decisions affecting citizens.

IIPA's focus on responsible AI in e-Governance reflects the growing recognition that technology adoption in government must be accompanied by strong governance frameworks. Ensuring that AI systems in government operate transparently, accountably, and under appropriate human supervision is essential to maintaining public trust in digital governance.`,
    location: 'New Delhi',
    datePublished: '2025-06-01',
    author: 'Parishrut Jassal',
  },
  {
    id: 36,
    image: '/insights/41.webp',
    title: 'AI & Healthcare Conference',
    description: 'Speaking at the AI and Healthcare Conference in Mohali on Responsible AI in the public healthcare sector and human-centered healthcare systems.',
    content: `Parishrut Jassal delivered a talk on Leveraging AI in Healthcare at the AI and Healthcare Conference in Mohali, addressing the application of Responsible AI principles in the public healthcare sector. The conference brought together healthcare administrators, clinicians, and technology providers to explore how AI can improve healthcare delivery while maintaining ethical standards and patient trust.

The presentation covered the unique governance challenges of AI in healthcare, including clinical validation requirements, patient data protection under the DPDP Act, algorithmic bias in diagnosis and treatment recommendations, and the importance of maintaining human-centred healthcare systems. Case studies demonstrated successful AI deployments in public health settings, from disease surveillance to resource optimization.

The conference highlighted the immense potential of AI to transform healthcare delivery in India, particularly in public health systems serving large and diverse populations. Realising this potential requires careful attention to governance, equity, and the preservation of the human relationships that are central to effective healthcare.`,
    location: 'Mohali, Punjab',
    datePublished: '2025-06-05',
    author: 'Parishrut Jassal',
  },
  {
    id: 37,
    image: '/insights/42.webp',
    title: 'Digital Health Workshop',
    description: 'AI & Healthcare Lead Dr. Mrudula Bhalke conducted a Digital Health workshop for medical professionals on the ethical, responsible adoption of AI.',
    content: `GovernAI's AI and Healthcare Lead, Dr. Mrudula Bhalke, conducted a Digital Health workshop for medical professionals, focusing on the ethical and responsible adoption of AI in clinical practice. The workshop addressed the growing need for healthcare practitioners to understand AI's capabilities, limitations, and governance requirements.

The session covered practical AI applications in clinical settings, including diagnostic support systems, predictive analytics for patient outcomes, and AI-assisted clinical documentation. Medical professionals explored the ethical considerations surrounding AI in healthcare, including informed consent for AI-assisted procedures, transparency in AI-driven recommendations, and the importance of maintaining clinical judgment alongside AI inputs.

Equipping medical professionals with AI literacy and governance knowledge is essential to ensuring that AI adoption in healthcare enhances rather than undermines patient care. Healthcare practitioners who understand AI's strengths and limitations can leverage technology effectively while maintaining the trust and safety that are fundamental to the doctor-patient relationship.`,
    location: 'India',
    datePublished: '2025-06-08',
    author: 'Dr. Mrudula Bhalke',
  },
  {
    id: 38,
    image: '/insights/43.webp',
    title: 'Introduction to AI — MGSIPA',
    description: 'A session for Government of Punjab officials at MGSIPA on AI literacy, responsible AI adoption, and building future-ready public sector capabilities.',
    content: `Conducted a session on Introduction to AI for Government of Punjab officials at MGSIPA, focusing on AI literacy, responsible AI adoption, and building future-ready capabilities within the public sector. The session was designed to provide officials with a foundational understanding of AI and its relevance to their work.

The training covered AI fundamentals, practical applications in government, and the governance frameworks necessary for responsible deployment. Officials learned to identify AI opportunities within their departments, assess risks associated with AI adoption, and understand their roles in ensuring that AI systems deployed in government operate ethically and effectively.

Building AI capacity across the Government of Punjab is a strategic investment in the state's digital future. Officials who understand AI and its governance implications are better positioned to lead digital transformation initiatives, evaluate technology proposals, and ensure that AI serves the public interest.`,
    location: 'Chandigarh',
    datePublished: '2025-06-10',
    author: 'Parishrut Jassal',
  },
  {
    id: 39,
    image: '/insights/44.webp',
    title: 'HP Working Group Appointment',
    description: 'Appointed as a Member of the Working Group under the Government of Himachal Pradesh — contributing to the vision of Samridh Himachal 2045.',
    content: `Appointed as a Member of the Working Group Committee on IT Infrastructure, Cyber Hubs, and Future Ready Industries for Samridh Himachal 2045, under the Department of Digital Technologies and Governance, Government of Himachal Pradesh. The role involves contributing towards Skilling, Digital and AI Governance initiatives for the state.

The Working Group is tasked with developing recommendations for building robust IT infrastructure, establishing cyber hubs to foster innovation, and creating an ecosystem for future-ready industries in Himachal Pradesh. Contributions are focused on AI governance frameworks, digital skills development, and strategies for responsible technology adoption aligned with the state's long-term development goals.

This appointment reflects the growing recognition of AI governance as a critical component of state-level development planning. Himachal Pradesh's forward-looking approach to integrating digital and AI governance into its vision for 2045 demonstrates how states can proactively build the institutional and human capacity needed for an AI-enabled future.`,
    location: 'Himachal Pradesh',
    datePublished: '2025-07-01',
    author: 'Parishrut Jassal',
  },
  {
    id: 40,
    image: '/insights/45.webp',
    title: 'AI Capacity for IAS Officers',
    description: 'A session on \u201CBuilding AI Capacity for Governance\u201D for IAS Probationary Officers and HP Administrative Services officers at MS-HIPA.',
    content: `Addressed IAS Probationary Officers at MS-HIPA with a session on "Building AI Capacity for Governance," introducing India's future administrative leaders to the governance dimensions of artificial intelligence at the outset of their careers. The session was designed to build foundational AI literacy among the country's premier civil service cadre.

The training covered AI fundamentals, governance frameworks, procurement standards, and ethical considerations specific to the public sector context. Officers engaged with case studies examining AI deployments in various government departments and discussed the challenges of ensuring accountability, transparency, and fairness in AI-assisted decision-making.

Building AI capacity among IAS and state administrative service officers is a strategic investment in India's governance future. These officers will be responsible for evaluating AI proposals, overseeing AI deployments, and developing policies that shape how AI is used across the public sector. Equipping them with AI governance knowledge early in their careers prepares them for the challenges of leading in an AI-enabled administration.`,
    location: 'Shimla, Himachal Pradesh',
    datePublished: '2025-07-15',
    author: 'Parishrut Jassal',
  },
  {
    id: 41,
    image: '/insights/46.webp',
    title: 'Public Sector AI Readiness',
    description: 'Delivering a session on \u201CBuilding AI Capacity for Governance\u201D at MS-HIPA — focusing on AI readiness and public sector competencies.',
    content: `Delivered a session on Public Sector AI Readiness for MS-HIPA, focusing on assessing and strengthening AI readiness across government departments. The session was part of an ongoing series aimed at building sustainable AI governance capabilities within the Himachal Pradesh government.

The training covered AI readiness assessment methodologies, competency frameworks for public sector AI roles, and practical roadmaps for building AI governance capabilities within government departments. Participants explored tools and frameworks for evaluating their departments' current AI maturity and developing action plans for capacity building.

MS-HIPA's sustained commitment to AI capacity building reflects Himachal Pradesh's leadership in preparing its workforce for an AI-enabled future. Systematic investment in AI readiness ensures that government departments are not only aware of AI's potential but are equipped with the practical competencies needed to deploy and govern AI systems responsibly and effectively.`,
    location: 'Shimla, Himachal Pradesh',
    datePublished: '2025-07-20',
    author: 'Parishrut Jassal',
  },
];
