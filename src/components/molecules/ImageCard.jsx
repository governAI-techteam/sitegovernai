'use client';

import { tokens } from "@/theme/tokens";

function ImageCard() {
    return (
        <>
         <div style={{ textAlign: "center", marginBottom: "20px", marginTop: "60px" }}>
           <h2 style={{ fontFamily: tokens?.fonts?.display || "inherit", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: tokens.onSurface, letterSpacing: "-0.03em" }}>
            Meet the <span style={{ color: tokens.primary }}>Team</span>
           </h2>
         </div>
        <div className="image-holder">
            <div style={{ display: 'flex', flexDirection: 'column', padding: '24px', background: tokens.surface, borderRadius: '24px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'default' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; }}>
                <img src="/assets/img/advisor.png" alt="Chief Advisor" style={{ width: "100%", height: "auto", aspectRatio: "4/5", objectFit: "cover", borderRadius: '16px', marginBottom: '20px' }} />
                <h6 style={{ fontSize: '20px', fontWeight: 800, color: tokens.onSurface, textAlign: 'center', marginBottom: '8px' }}>Chief Advisor</h6>
                <div style={{ fontSize: '15px', color: tokens.secondary, textAlign: 'center', lineHeight: 1.6 }}>
                    <p>Dr. Murthy Remilla, Former Senior Scientist at ISRO and Head of Project Management for Gaganyaan, with 35+ years in technical and leadership roles.</p>
                </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', padding: '24px', background: tokens.surface, borderRadius: '24px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'default' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; }}>
                <img src="/assets/img/senior-1.png" alt="AI Healthcare Lead" style={{ width: "100%", height: "auto", aspectRatio: "4/5", objectFit: "cover", borderRadius: '16px', marginBottom: '20px' }} />
                <h6 style={{ fontSize: '20px', fontWeight: 800, color: tokens.onSurface, textAlign: 'center', marginBottom: '8px' }}>AI & Healthcare Lead</h6>
                <p style={{ fontSize: '15px', color: tokens.secondary, textAlign: 'center', lineHeight: 1.6 }}>
                   Dr. Utso Guha Roy, MD in Pathology (2018), Certified in AI Medicine (CCAIM), Post-Doctoral in Digital Pathology.
                </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', padding: '24px', background: tokens.surface, borderRadius: '24px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'default' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; }}>
                <img src="/assets/img/senior-2.png" alt="Chief Compliance Officer" style={{ width: "100%", height: "auto", aspectRatio: "4/5", objectFit: "cover", borderRadius: '16px', marginBottom: '20px' }} />
                <h6 style={{ fontSize: '20px', fontWeight: 800, color: tokens.onSurface, textAlign: 'center', marginBottom: '8px' }}>Chief Compliance Officer</h6>
                <p style={{ fontSize: '15px', color: tokens.secondary, textAlign: 'center', lineHeight: 1.6 }}>
                    AI & Frontier Tech Lawyer | AI Governance, ISO 42001, IP & Data Protection | Certified Implementer/Auditor in ISO 42001:2023 and ISO 9001:2015.
                </p>
            </div>
        </div>
        </>
    );
}

export default ImageCard;