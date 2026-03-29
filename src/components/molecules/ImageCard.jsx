'use client';

import { tokens } from "@/theme/tokens";

function ImageCard() {
    return (
        <div className="image-holder">
            <div style={{ gridArea: "1 / 2", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', background: tokens.surface, borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src="/assets/img/advisor.png" alt="GovernAI" style={{ width: "100%", height: "100%", opacity: 1, zIndex: 0, borderRadius: '4px' }} />
                <h6 style={{ marginTop: '8px', fontSize: '16px', fontWeight: 600, color: tokens.onSurface, textAlign: 'center' }}>Chief Advisor</h6>
                <div style={{ marginTop: '4px', fontSize: '14px', color: tokens.secondary, textAlign: 'center', lineHeight: 1.4 }}>
                    <p>Dr. Murthy Remilla, Former Senior Scientist at ISRO and Head of Project Management for Gaganyaan, with 35+ years in technical and leadership roles.</p>
                </div>
            </div>
            <div style={{ gridArea: "2 / 1", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', background: tokens.surface, borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src="/assets/img/senior-1.png" alt="GovernAI" style={{ width: "80%", height: "80%", opacity: 1, zIndex: 0, borderRadius: '4px' }} />
                <h6 style={{ marginTop: '8px', fontSize: '16px', fontWeight: 600, color: tokens.onSurface, textAlign: 'center' }}>AI and Healthcare Lead</h6>

                <p style={{ marginTop: '4px', fontSize: '14px', color: tokens.secondary, textAlign: 'center', lineHeight: 1.4 }}>
                   Dr. Utso Guha Roy, MD in Pathology (2018), Certified in AI Medicine (CCAIM), Post-Doctoral in Digital Pathology.
                </p>
            </div>
            <div style={{ gridArea: "2 / 3", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', background: tokens.surface, borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src="/assets/img/senior-2.png" alt="GovernAI" style={{ width: "100%", height: "100%", opacity: 1, zIndex: 0, borderRadius: '4px' }} />
                <h6 style={{ marginTop: '8px', fontSize: '16px', fontWeight: 600, color: tokens.onSurface, textAlign: 'center' }}>Chief Compliance Officer</h6>
                <p style={{ marginTop: '4px', fontSize: '14px', color: tokens.secondary, textAlign: 'center', lineHeight: 1.4 }}>
                    AI & Frontier Tech Lawyer | AI Governance, ISO 42001, IP & Data Protection | Certified Implementer/Auditor in ISO 42001:2023 and ISO 9001:2015.
                </p>
            </div>
        </div>
    );
}

export default ImageCard;