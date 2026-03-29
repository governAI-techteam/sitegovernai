"use client";

import { tokens } from "@/theme/tokens";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";

const experiences = [
  {
    role: "Working Group Member (Digital & AI Governance)",
    org: "Government of Himachal Pradesh",
    duration: "Jul 2025 - Present · 9 mos",
    desc: "I have been appointed as a Member of Working Group Committee (I.T. Infrastructure, Cyber-Hubs and Future Ready Industries) for Samridh Himachal-2045, under the aegis of Department of Digital Technologies and Governance, Government of Himachal Pradesh. I will be contributing towards Skilling, Digital & AI Governance, Sub-Group!",
    skills: ""
  },
  {
    role: "Advisor",
    org: "Future Shift Labs (FSL)",
    duration: "Dec 2024 - Present · 1 yr 4 mos",
    desc: "I offer Research & Advisory in the domain of AI Governance at Future Shift Labs (FSL). I contribute to shaping responsible and effective governance frameworks for artificial intelligence, ensuring alignment with democratic values and societal advancement.",
    skills: ""
  },
  {
    role: "Deputy Advisor",
    org: "National Institute of Educational Planning and Administration (NIEPA)",
    duration: "Apr 2024 - Dec 2024 · 9 mos | New Delhi, India",
    desc: "I worked with the International Cooperation Cell (ICC) of the Ministry of Education on policy development and agendas encompassing the internationalisation of higher education and AI concerning UNESCO, Asia Pacific, and Oceania.",
    skills: "Communication, Policy Development"
  },
  {
    role: "AI Policy Research Group Member",
    org: "Center for AI and Digital Policy",
    duration: "Jul 2024 - Nov 2024 · 5 mos | Washington, US · Remote",
    desc: "As a member of the AI Policy Research Group at the Center for AI and Digital Policy, I delved into the intricate world of AI policy analysis and evaluation. My role involved researching and analyzing various AI policy frameworks, including the OECD AI Principles and the UNESCO Recommendation on the Ethics of AI. (Certification for the AI Policy Clinic Program).",
    skills: "Communication, Curriculum Development, Policy Analysis"
  },
  {
    role: "Course Facilitator (AI Governance Fellowship)",
    org: "Equiano Institute",
    duration: "Mar 2024 - May 2024 · 3 mos | South Africa · Remote",
    desc: "I facilitated the cohort of AI Governance, focusing on developing frameworks and policies to ensure the responsible and ethical use of AI technology. The AI Governance Fellowship is a pioneering program dedicated to advancing the fairness and integrity of AI technologies in the Global South.",
    skills: "Communication, Leadership, AI Governance, AI Policy Development, Responsible AI, Curriculum Development"
  }
];

export function FounderProfile() {
  return (
    <Container style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{ fontFamily: tokens?.fonts?.display || "inherit", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: tokens.onSurface, marginBottom: "16px", letterSpacing: "-0.03em" }}>
          Meet the <span style={{ color: tokens.primary }}>Founder</span>
        </h2>
        <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: tokens.secondary, maxWidth: "600px", margin: "0 auto" }}>
          Pioneering AI policy and creating responsible governance frameworks on a global scale.
        </p>
      </div>

      <div className="responsive-flex" style={{ display: "flex", gap: "60px", alignItems: "flex-start" }}>
        {/* Left Column: Image & Highlights */}
        <div style={{ flex: "1", position: "sticky", top: "100px" }} className="mobile-w-full mobile-mb-sm">
          <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", boxShadow: "0 24px 48px rgba(0,0,0,0.12)", background: tokens.surface, marginBottom: "20px" }}>
            <img src="/assets/img/founder.png" alt="Founder" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "top" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", padding: "30px", color: "#fff" }}>
              <h3 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "4px" }}>Parishrut Jassal</h3>
              <p style={{ fontSize: "16px", opacity: 0.9, fontWeight: 500 }}>AI Policy & Governance Leader</p>
            </div>
          </div>
          
          <a href="https://linkedin.com/in/parishrut-jassal" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            background: "#0077b5", color: "#fff", padding: "16px 24px", borderRadius: "12px",
            fontWeight: 600, fontSize: "16px", textDecoration: "none", transition: "background 0.2s ease",
            boxShadow: "0 4px 12px rgba(0, 119, 181, 0.2)"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#005e8e"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#0077b5"}>
            <Icon name="link" size={18} /> Connect on LinkedIn
          </a>
        </div>

        {/* Right Column: Experience Timeline / Roadmap */}
        <div style={{ flex: "1.5", display: "flex", flexDirection: "column" }} className="mobile-w-full">
          {experiences.map((exp, i) => (
            <div key={i} style={{ display: "flex", gap: "24px", paddingBottom: i !== experiences.length - 1 ? "40px" : "0" }}>
              
              {/* Roadmap Graphic Column */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20px", flexShrink: 0 }}>
                <div style={{ width: "2px", height: "36px", background: i === 0 ? "transparent" : tokens.primary, opacity: 0.3 }} />
                <div style={{ 
                  width: "18px", height: "18px", 
                  borderRadius: "50%", 
                  background: tokens.surface, 
                  border: `3px solid ${tokens.primary}`, 
                  zIndex: 2, flexShrink: 0,
                  boxShadow: `0 0 0 4px rgba(0,0,0,0.03)`
                }} />
                <div style={{ width: "2px", flexGrow: 1, background: i !== experiences.length - 1 ? tokens.primary : "transparent", opacity: 0.3 }} />
              </div>

              {/* Content Card */}
              <div style={{ 
                flex: "1",
                background: tokens.surface, 
                padding: "32px", 
                borderRadius: "16px", 
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)", 
                border: "1px solid rgba(0,0,0,0.03)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "default"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
              }}>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: tokens.onSurface, marginBottom: "6px" }}>{exp.role}</h4>
                <div style={{ fontSize: "16px", color: tokens.primary, fontWeight: 600, marginBottom: "12px" }}>{exp.org}</div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: tokens.secondary, marginBottom: "16px", fontWeight: 500 }}>
                  <Icon name="history" size={14} /> 
                  {exp.duration}
                </div>
                
                <p style={{ fontSize: "15px", color: tokens.secondary, lineHeight: 1.6, marginBottom: exp.skills ? "16px" : "0" }}>
                  {exp.desc}
                </p>

                {exp.skills && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
                    {exp.skills.split(", ").map((skill, idx) => (
                      <span key={idx} style={{ 
                        fontSize: "12px", 
                        background: "rgba(0,0,0,0.05)", 
                        color: tokens.onSurface, 
                        padding: "4px 10px", 
                        borderRadius: "100px",
                        fontWeight: 600
                      }}>
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
