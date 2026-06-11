/* humans.txt — standard web convention for crediting the team.
   Served at /humans.txt, crawled by search engines.
   Developer listed first, followed by the full team. */

export function GET() {
  const content = `/* DEVELOPER */
Developer: Divyakush Punjabi
Role: Full Stack Developer & AI Engineer
Site: https://divyakush2006.github.io/divyakush-resume/
GitHub: https://github.com/divyakush2006
LinkedIn: https://linkedin.com/in/divyakush-punjabi
Location: India

/* TEAM */
Founder & CEO: Parishrut Jassal
Role: Founder & Chief Executive Officer
LinkedIn: https://linkedin.com/in/parishrut-jassal

Chief Compliance Officer: Alvin Antony
Role: AI & Frontier Tech Lawyer
Expertise: AI Governance, ISO 42001, Data Protection

AI & Healthcare Lead: Dr. Utso Guha Roy
Role: AI & Healthcare Lead
Expertise: Digital Pathology, AI in Healthcare

Technical & Security Lead: Anubhav Sharma
Role: Technical & Security Lead
Expertise: DevSecOps, Cloud Security, Cybersecurity

AI & Healthcare Consultant: Dr. Himanshu Kalia
Role: Scientific Officer, IIT DRISHTI CPS
Expertise: Healthcare Research, AI Applications

Operations & Training Lead: Er. Preekshit Singh
Role: Operations & Training Lead
Expertise: Training Delivery, Process Optimization

/* ADVISORS */
Chief Advisor: Dr. Murthy Remilla
Role: President, Telemedicine Society of India

International Advisor: Maya Sherman
Role: International AI Policy Advisor

Industry Advisor: Arun Pandit
Role: Co-Founder of Hyphen SCS, TEDx Speaker

/* SITE */
Name: GovernAI
URL: https://www.governai.info
Standards: HTML5, CSS3, ES2024
Framework: Next.js 16
Language: English
Last Updated: ${new Date().toISOString().split('T')[0]}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
