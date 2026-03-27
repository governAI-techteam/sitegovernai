"use client";

import { useState } from "react";
import { tokens } from "@/theme/tokens";
import { NAV_ITEMS } from "@/config/content";
import { useScroll } from "@/context/ScrollContext";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";

//Check drop down mobile menu

function NavLink({ label, active, onClick, mobile }) {
  const [hov, setHov] = useState(false);

  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "none", border: "none", cursor: "pointer", 
        padding: mobile ? "12px 0" : "4px 0 6px", 
        width: mobile ? "100%" : "auto", 
        textAlign: mobile ? "left" : "center",
        fontFamily: tokens.fonts.display, fontWeight: 600, fontSize: mobile ? 16 : 14, 
        color: active ? tokens.primary : hov ? tokens.onSurface : tokens.secondary, 
        borderBottom: mobile ? `1px solid ${tokens.outlineVariant}` : `2px solid ${active ? tokens.primary : "transparent"}`, 
        transition: "color .2s, border-color .2s"
      }}
    >
      {label}
    </button>
  );
}

export function NavBar({ activeSection }) {
  const scrollTo = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
 

  const handleNavClick = (sectionId) => {
    scrollTo(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,.85)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: "0 1px 0 rgba(0,0,0,.06)" }}>
      <Container style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 24px" }}>
        <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: tokens.fonts.display, fontSize: 21, fontWeight: 800, letterSpacing: "-0.05em", color: "#0f172a" }}>
          GovernAI
        </button>

        {/* Desktop Links */}
        <div className="hide-on-mobile" style={{ display: "flex", gap: 30, alignItems: "center" }}>
          {NAV_ITEMS.map(({ label, sectionId }) => (
            <NavLink key={sectionId} label={label} active={activeSection === sectionId} onClick={() => scrollTo(sectionId)} />
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hide-on-mobile" style={{ display: "flex", gap: 10 }}>
          <Button variant="ghost" style={{ padding: "8px 18px", fontSize: 14, borderRadius: 10 }}>Sign In</Button>
          <Button variant="primary" style={{ padding: "8px 18px", fontSize: 14, borderRadius: 10 }}>Get Started</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="show-flex-on-mobile" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: tokens.onSurface, padding: "8px", alignItems: "center", justifyContent: "center" }}
        >
          <Icon name={isMobileMenuOpen ? "close" : "menu"} size={28} />
        </button>
      </Container>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="hide-on-desktop" style={{ position: "absolute", top: "100%", left: 0, width: "100%", background: "#fff", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 99, padding: "16px 24px", borderTop: `1px solid ${tokens.outlineVariant}` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {NAV_ITEMS.map(({ label, sectionId }) => (
              <NavLink key={sectionId} label={label} active={activeSection === sectionId} onClick={() => handleNavClick(sectionId)} mobile />
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              <Button variant="ghost" style={{ padding: "12px", fontSize: 16, borderRadius: 10, width: "100%" }}>Sign In</Button>
              <Button variant="primary" style={{ padding: "12px", fontSize: 16, borderRadius: 10, width: "100%" }}>Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
