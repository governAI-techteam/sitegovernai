'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '@/config/seo';
import { tokens } from '@/theme/tokens';

const EASE = [0.22, 1, 0.36, 1];

function FaqItem({ q, a, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
      style={{
        borderRadius: 18,
        border: `1px solid ${isOpen ? 'rgba(241,106,36,0.22)' : 'rgba(16,24,40,0.08)'}`,
        background: isOpen
          ? 'linear-gradient(165deg, #fffdfb 0%, #fffaf6 100%)'
          : '#fff',
        boxShadow: isOpen
          ? '0 12px 32px rgba(241,106,36,0.08)'
          : '0 1px 2px rgba(16,24,40,0.04)',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: 'clamp(18px, 2.2vw, 24px)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: isOpen ? tokens.primary : tokens.onSurface,
            transition: 'color 0.25s ease',
          }}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{
            flexShrink: 0,
            width: 30,
            height: 30,
            borderRadius: 9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isOpen
              ? 'linear-gradient(135deg, #f16a24, #f16a24)'
              : 'rgba(16,24,40,0.05)',
            color: isOpen ? '#fff' : tokens.secondary,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                margin: 0,
                padding: '0 clamp(18px, 2.2vw, 24px) clamp(18px, 2.2vw, 24px)',
                fontSize: 'clamp(14px, 1.1vw, 15.5px)',
                lineHeight: 1.7,
                color: tokens.secondary,
                fontFamily: tokens.fonts.body,
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      aria-labelledby="faq-heading"
      style={{
        position: 'relative',
        background: tokens.surface,
        padding: 'clamp(72px, 8vw, 110px) 24px',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 'clamp(36px, 4vw, 52px)' }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: tokens.primary,
              background: 'rgba(241,106,36,0.07)',
              border: '1px solid rgba(241,106,36,0.18)',
              padding: '6px 16px',
              borderRadius: 999,
              marginBottom: 16,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: tokens.primary }} />
            FAQ
          </span>
          <h2
            id="faq-heading"
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              color: tokens.onSurface,
              margin: '0 0 14px',
            }}
          >
            Frequently Asked{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f16a24 0%, #f16a24 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Questions
            </span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', color: tokens.secondary, lineHeight: 1.65, maxWidth: 520, margin: '0 auto' }}>
            Everything you need to know about AI governance and how GovernAI can help your organisation.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FAQS.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
