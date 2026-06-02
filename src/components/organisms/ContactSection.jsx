'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '@/theme/tokens';

const EASE = [0.22, 1, 0.36, 1];

const INQUIRY_TYPES = [
  'Capacity Building & Training',
  'AI Compliance & Auditing',
  'Policy & Advisory',
  'Partnership / MoU',
  'General Enquiry',
];

const CONTACT_CARDS = [
  {
    label: 'Email us',
    value: 'contact@governai.info',
    href: 'mailto:contact@governai.info',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Connect on LinkedIn',
    value: 'GovernAI Official',
    href: 'https://www.linkedin.com/company/governaiofficial/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Headquarters',
    value: 'New Delhi, India',
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const TRUST = [
  { value: '2000+', label: 'Officials Trained' },
  { value: '20+', label: 'Institutions' },
  { value: '5+', label: 'States & UTs' },
];

function Field({ label, children, required }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: tokens.onSurface, fontFamily: tokens.fonts.display, letterSpacing: '0.01em' }}>
        {label}{required && <span style={{ color: tokens.primary }}> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputBase = {
  width: '100%',
  padding: '13px 16px',
  borderRadius: 12,
  border: '1.5px solid rgba(16,24,40,0.1)',
  background: '#fff',
  fontSize: 14.5,
  fontFamily: tokens.fonts.body,
  color: tokens.onSurface,
  outline: 'none',
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  boxSizing: 'border-box',
};

function useFocusStyle() {
  const onFocus = (e) => {
    e.currentTarget.style.borderColor = tokens.primary;
    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(234,105,38,0.12)';
  };
  const onBlur = (e) => {
    e.currentTarget.style.borderColor = 'rgba(16,24,40,0.1)';
    e.currentTarget.style.boxShadow = 'none';
  };
  return { onFocus, onBlur };
}

export function ContactSection() {
  const focus = useFocusStyle();
  const [form, setForm] = useState({
    name: '', email: '', org: '', type: INQUIRY_TYPES[0], message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    // No backend wired yet — open the user's mail client with a prefilled draft.
    setTimeout(() => {
      const subject = encodeURIComponent(`[${form.type}] Enquiry from ${form.name || 'Website'}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nOrganisation: ${form.org}\nInterest: ${form.type}\n\n${form.message}`
      );
      window.location.href = `mailto:contact@governai.info?subject=${subject}&body=${body}`;
      setStatus('sent');
    }, 900);
  };

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: tokens.surface, padding: 'clamp(120px, 14vh, 170px) 24px clamp(60px, 8vw, 100px)' }}>
      {/* Ambient background */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-180px', left: '50%', transform: 'translateX(-50%)',
        width: 1000, height: 520, maxWidth: '95%',
        background: 'radial-gradient(ellipse at center, rgba(234,105,38,0.14) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(234,105,38,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(234,105,38,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 70% 50% at 50% 12%, #000 0%, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 12%, #000 0%, transparent 72%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto clamp(40px, 5vw, 64px)' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: tokens.primary,
            background: 'rgba(234,105,38,0.07)', border: '1px solid rgba(234,105,38,0.18)',
            padding: '6px 16px', borderRadius: 999, marginBottom: 18,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: tokens.primary }} />
            Get in Touch
          </span>
          <h1 style={{
            fontFamily: tokens.fonts.display, fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1.05, color: tokens.onSurface, margin: '0 0 16px',
          }}>
            Let&apos;s build{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ea6926 0%, #ff8c42 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>responsible AI</span>{' '}together
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', color: tokens.secondary, lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            Whether you&apos;re building AI literacy, pursuing compliance, or shaping policy —
            our team will get back to you within one business day.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.35fr', gap: 'clamp(24px, 3vw, 44px)', alignItems: 'stretch' }}>
          {/* LEFT — Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            style={{
              position: 'relative', overflow: 'hidden',
              borderRadius: 26, padding: 'clamp(30px, 3vw, 44px)',
              background: 'linear-gradient(160deg, #191c1e 0%, #2d3133 100%)',
              color: '#fff', display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', gap: 'clamp(28px, 4vw, 48px)',
              boxShadow: '0 24px 60px rgba(16,24,40,0.2)',
            }}
          >
            {/* glow */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: -120, right: -100, width: 320, height: 320, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(234,105,38,0.35) 0%, transparent 70%)', filter: 'blur(40px)',
            }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: tokens.fonts.display, fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
                Reach our team directly
              </h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                We partner with governments, universities, and enterprises to deploy AI
                with absolute compliance and zero bias.
              </p>
            </div>

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'clamp(18px, 2.5vw, 28px)' }}>
              {CONTACT_CARDS.map((c) => {
                const inner = (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{
                      width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(234,105,38,0.16)', border: '1px solid rgba(234,105,38,0.28)', color: '#ff8c42',
                    }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{c.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginTop: 2 }}>{c.value}</div>
                    </div>
                  </div>
                );
                return c.href ? (
                  <motion.a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    whileHover={{ x: 4 }} style={{ textDecoration: 'none' }}>{inner}</motion.a>
                ) : (
                  <div key={c.label}>{inner}</div>
                );
              })}
            </div>

            {/* Trust strip */}
            <div style={{ position: 'relative', display: 'flex', gap: 8, paddingTop: 'clamp(20px, 3vw, 28px)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {TRUST.map((t, i) => (
                <div key={t.label} style={{ flex: 1, textAlign: i === 0 ? 'left' : 'center' }}>
                  <div style={{ fontFamily: tokens.fonts.display, fontSize: 22, fontWeight: 800, color: '#ff8c42', letterSpacing: '-0.02em' }}>{t.value}</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginTop: 3 }}>{t.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
            style={{
              borderRadius: 26, padding: 'clamp(28px, 3vw, 40px)',
              background: 'linear-gradient(165deg, #fffdfb 0%, #fffaf6 100%)',
              border: '1px solid rgba(234,105,38,0.1)',
              boxShadow: '0 24px 60px rgba(16,24,40,0.06)',
            }}
          >
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ minHeight: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                    style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #ea6926, #ff8c42)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 28px rgba(234,105,38,0.35)' }}
                  >
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </motion.div>
                  <h3 style={{ fontFamily: tokens.fonts.display, fontSize: 22, fontWeight: 800, color: tokens.onSurface, margin: 0 }}>Thank you!</h3>
                  <p style={{ fontSize: 15, color: tokens.secondary, maxWidth: 340, lineHeight: 1.6, margin: 0 }}>
                    Your draft has been prepared in your email client. We&apos;ll respond within one business day.
                  </p>
                  <button onClick={() => setStatus('idle')} style={{ marginTop: 8, background: 'none', border: 'none', color: tokens.primary, fontWeight: 700, fontFamily: tokens.fonts.display, cursor: 'pointer', fontSize: 14 }}>
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
                >
                  <div className="contact-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field label="Full name" required>
                      <input {...focus} required value={form.name} onChange={set('name')} placeholder="Jane Doe" style={inputBase} />
                    </Field>
                    <Field label="Work email" required>
                      <input {...focus} required type="email" value={form.email} onChange={set('email')} placeholder="jane@org.gov.in" style={inputBase} />
                    </Field>
                  </div>

                  <Field label="Organisation">
                    <input {...focus} value={form.org} onChange={set('org')} placeholder="Ministry / University / Company" style={inputBase} />
                  </Field>

                  <Field label="How can we help?" required>
                    <select {...focus} value={form.type} onChange={set('type')} style={{ ...inputBase, cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23515f74\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}>
                      {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>

                  <Field label="Message" required>
                    <textarea {...focus} required value={form.message} onChange={set('message')} rows={5} placeholder="Tell us about your goals, timeline, and team size…" style={{ ...inputBase, resize: 'vertical', minHeight: 120, lineHeight: 1.6 }} />
                  </Field>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: status === 'sending' ? 1 : 1.02, y: status === 'sending' ? 0 : -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'sending'}
                    style={{
                      marginTop: 4, padding: '16px 32px', borderRadius: 14, border: 'none',
                      background: 'linear-gradient(135deg, #ea6926 0%, #ff8c42 100%)', color: '#fff',
                      fontFamily: tokens.fonts.display, fontSize: 15.5, fontWeight: 700, letterSpacing: '0.02em',
                      cursor: status === 'sending' ? 'wait' : 'pointer',
                      boxShadow: '0 10px 28px rgba(234,105,38,0.32)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          style={{ width: 18, height: 18, border: '2.5px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%' }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      </>
                    )}
                  </motion.button>

                  <p style={{ fontSize: 12, color: tokens.textMuted, textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
                    By submitting, you agree to be contacted regarding your enquiry. We never share your details.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .contact-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
