'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { indiaMap } from '@/config/indiaMap';
import { tokens } from '@/theme/tokens';

/*
  GovernAI's recognition spreads state-by-state across an accurate India map.
  Phases per state:  line travels slowly  ->  on arrival the state highlights
  ->  5s dwell  ->  line moves to next.  Runs ONCE, then becomes interactive:
  hovering a captured state reveals the institutions engaged there (above it).
*/

// viewBox is square 0..VB. centroid c is in that space. lp = label anchor.
const VB = 9999;

const JOURNEY = [
  { id: 'HP', label: 'Himachal',      c: [3147, 1727], lp: [1500, 1380], leader: true },
  { id: 'CH', label: 'Chandigarh',    c: [2942, 2089], lp: [1150, 1880], leader: true },
  { id: 'PB', label: 'Punjab',        c: [2496, 2038], lp: [1020, 2330], leader: true },
  { id: 'DL', label: 'Delhi',         c: [3055, 2778], lp: [1250, 2820], leader: true },
  { id: 'UP', label: 'Uttar Pradesh', c: [4162, 3481], lp: [4162, 3560] },
  { id: 'BR', label: 'Bihar',         c: [5941, 3742], lp: [5941, 3742] },
  { id: 'WB', label: 'West Bengal',   c: [6851, 4351], lp: [7400, 4760], leader: true },
  { id: 'GJ', label: 'Gujarat',       c: [1163, 4770], lp: [1050, 5120] },
  { id: 'TN', label: 'Tamil Nadu',    c: [3705, 8460], lp: [3705, 8800] },
];

const INSTITUTIONS = {
  HP: [
    { name: 'MS-HIPA, Shimla', cat: 'Government' },
    { name: 'SIRD&PR, Himachal Pradesh', cat: 'Government' },
    { name: 'Govt. of HP — AI Working Group', cat: 'Public Sector' },
  ],
  CH: [
    { name: 'MGSIPA, Chandigarh', cat: 'Government' },
    { name: 'Chandigarh University', cat: 'Academia' },
  ],
  PB: [
    { name: 'Dept. of Technical Education & Training', cat: 'Government' },
    { name: 'C-DAC Mohali', cat: 'Technology' },
    { name: 'AI & Healthcare Conference, Mohali', cat: 'Healthcare' },
  ],
  DL: [
    { name: 'Indian Institute of Public Administration', cat: 'Government' },
    { name: 'NIEPA, Ministry of Education', cat: 'Government' },
    { name: 'National Law University, Delhi', cat: 'Academia' },
    { name: 'Jawaharlal Nehru University', cat: 'Academia' },
  ],
  UP: [
    { name: 'UP Skill Development Mission', cat: 'Government' },
    { name: 'Samarth Initiative', cat: 'Public Sector' },
  ],
  BR: [{ name: 'AIIMS Patna', cat: 'Healthcare' }],
  WB: [{ name: 'UEM Kolkata', cat: 'Academia' }],
  GJ: [
    { name: 'Gujarat National Law University', cat: 'Academia' },
    { name: 'Dhirubhai Ambani University', cat: 'Academia' },
  ],
  TN: [{ name: "AI Legislators' Forum (AILF)", cat: 'Government' }],
};

const CAT_COLORS = {
  Government: '#ea6926',
  'Public Sector': '#ff8c42',
  Academia: '#1a2230',
  Healthcare: '#e0892f',
  Technology: '#515f74',
};

const TRAVEL_MS = 2800;   // slow line travel between states
const DWELL_MS = 3000;    // pause after a state highlights
const FIRST_MS = 500;     // first state appears quickly
const ORANGE = '#ea6926';
const ORANGE_LT = '#ff8c42';

const BY_ID = Object.fromEntries(JOURNEY.map((j) => [j.id, j]));

export default function IndiaConquestMap() {
  const [step, setStep] = useState(0);      // index currently being processed
  const [arrived, setArrived] = useState(false);
  const [hovered, setHovered] = useState(null);

  const finished = step >= JOURNEY.length;

  useEffect(() => {
    if (finished) return;
    let t;
    if (!arrived) {
      t = setTimeout(() => setArrived(true), step === 0 ? FIRST_MS : TRAVEL_MS);
    } else {
      t = setTimeout(() => {
        setStep((s) => s + 1);
        setArrived(false);
      }, DWELL_MS);
    }
    return () => clearTimeout(t);
  }, [step, arrived, finished]);

  // number of fully highlighted states
  const hi = Math.min(step + (arrived ? 1 : 0), JOURNEY.length);

  const capturedSet = useMemo(
    () => new Set(JOURNEY.slice(0, hi).map((j) => j.id)),
    [hi]
  );

  // completed connections between highlighted states
  const connections = [];
  for (let i = 1; i < hi; i++) {
    connections.push({ from: JOURNEY[i - 1].c, to: JOURNEY[i].c, key: `c-${i}` });
  }

  // line + comet currently travelling toward step
  const travelling = !finished && !arrived && step > 0;
  const travelFrom = travelling ? JOURNEY[step - 1].c : null;
  const travelTo = travelling ? JOURNEY[step].c : null;

  // counters
  const progress = hi / JOURNEY.length;
  const officials = Math.round(2000 * progress);
  const institutions = Math.round(20 * progress);
  const statesCount = Math.max(1, Math.round(5 * progress));

  // hover panel placement
  const hov = finished && hovered ? BY_ID[hovered] : null;
  let panelPos = null;
  if (hov) {
    const xPct = (hov.c[0] / VB) * 100;
    const yPct = (hov.c[1] / VB) * 100;
    const below = yPct < 33;
    const tx = xPct < 28 ? '-12%' : xPct > 72 ? '-88%' : '-50%';
    panelPos = {
      left: `${xPct}%`,
      top: `${yPct}%`,
      transform: below
        ? `translate(${tx}, 24px)`
        : `translate(${tx}, calc(-100% - 24px))`,
    };
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        viewBox={indiaMap.viewBox}
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        role="img"
        aria-label="Map of India showing GovernAI's recognition spreading across states"
      >
        <defs>
          <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={ORANGE} />
            <stop offset="100%" stopColor={ORANGE_LT} />
          </linearGradient>
          <filter id="pinGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="55" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* Base states */}
        {indiaMap.states.map((s) => {
          const isCaptured = capturedSet.has(s.id);
          const isHovered = hovered === s.id;
          const hoverable = finished && isCaptured;
          return (
            <path
              key={s.id}
              d={s.d}
              onMouseEnter={hoverable ? () => setHovered(s.id) : undefined}
              onMouseLeave={hoverable ? () => setHovered(null) : undefined}
              style={{
                fill: isCaptured ? 'url(#capGrad)' : '#e6ebf0',
                stroke: isCaptured ? (isHovered ? '#fff' : ORANGE) : '#cdd6df',
                strokeWidth: isCaptured ? (isHovered ? 24 : 12) : 7,
                fillOpacity: isCaptured ? (isHovered ? 1 : 0.92) : 1,
                cursor: hoverable ? 'pointer' : 'default',
                filter: isHovered ? 'brightness(1.08)' : 'none',
                transition:
                  'fill 0.6s ease, fill-opacity 0.3s ease, stroke 0.3s ease, stroke-width 0.3s ease',
              }}
            />
          );
        })}

        {/* Completed connection lines — bold */}
        <g style={{ pointerEvents: 'none' }}>
        {connections.map((c) => (
          <g key={c.key}>
            <line
              x1={c.from[0]} y1={c.from[1]} x2={c.to[0]} y2={c.to[1]}
              stroke={ORANGE} strokeWidth={22} strokeLinecap="round"
              opacity={0.25} filter="url(#lineGlow)"
            />
            <line
              x1={c.from[0]} y1={c.from[1]} x2={c.to[0]} y2={c.to[1]}
              stroke="url(#capGrad)" strokeWidth={12} strokeLinecap="round"
            />
          </g>
        ))}
        </g>

        {/* Currently travelling line (draws slowly) */}
        {travelling && (
          <g key={`travel-${step}`} style={{ pointerEvents: 'none' }}>
            <motion.line
              x1={travelFrom[0]} y1={travelFrom[1]} x2={travelTo[0]} y2={travelTo[1]}
              stroke={ORANGE} strokeWidth={22} strokeLinecap="round"
              opacity={0.22} filter="url(#lineGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: TRAVEL_MS / 1000, ease: [0.45, 0, 0.55, 1] }}
            />
            <motion.line
              x1={travelFrom[0]} y1={travelFrom[1]} x2={travelTo[0]} y2={travelTo[1]}
              stroke="url(#capGrad)" strokeWidth={13} strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: TRAVEL_MS / 1000, ease: [0.45, 0, 0.55, 1] }}
            />
            {/* comet head */}
            <motion.circle
              r={46} fill={ORANGE_LT} filter="url(#pinGlow)"
              initial={{ cx: travelFrom[0], cy: travelFrom[1] }}
              animate={{ cx: travelTo[0], cy: travelTo[1] }}
              transition={{ duration: TRAVEL_MS / 1000, ease: [0.45, 0, 0.55, 1] }}
            />
          </g>
        )}

        {/* Highlighted pins + labels */}
        <g style={{ pointerEvents: 'none' }}>
        {JOURNEY.slice(0, hi).map((j) => {
          const isHovered = hovered === j.id;
          const anchor = j.leader ? (j.lp[0] < j.c[0] ? 'end' : 'start') : 'middle';
          return (
            <g key={`pin-${j.id}`}>
              <motion.circle
                cx={j.c[0]} cy={j.c[1]} fill="none" stroke={ORANGE} strokeWidth={6}
                initial={{ r: 12, opacity: 0.7 }}
                animate={{ r: 150, opacity: 0 }}
                transition={{ duration: 1.8, ease: 'easeOut', repeat: Infinity, repeatDelay: finished ? 2.6 : 1.2 }}
              />
              {j.leader && (
                <line
                  x1={j.c[0]} y1={j.c[1]} x2={j.lp[0]} y2={j.lp[1]}
                  stroke={ORANGE} strokeWidth={5} opacity={0.4}
                />
              )}
              <motion.circle
                cx={j.c[0]} cy={j.c[1]} fill="url(#capGrad)" stroke="#fff" strokeWidth={9}
                initial={{ r: 0 }}
                animate={{ r: isHovered ? 60 : 46 }}
                transition={{ type: 'spring', stiffness: 320, damping: 16 }}
              />
              <circle cx={j.c[0]} cy={j.c[1]} r={17} fill="#fff" />

              <motion.text
                x={j.lp[0]} y={j.lp[1]} textAnchor={anchor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: 360,
                  fontWeight: 800,
                  fill: isHovered ? ORANGE : '#1a2230',
                  paintOrder: 'stroke',
                  stroke: '#ffffff',
                  strokeWidth: 70,
                  strokeLinejoin: 'round',
                  letterSpacing: '-4px',
                  pointerEvents: 'none',
                  transition: 'fill 0.25s ease',
                }}
              >
                {j.label}
              </motion.text>
            </g>
          );
        })}
        </g>
      </svg>

      {/* Stats — top right, clear of the map */}
      <div
        style={{
          position: 'absolute',
          top: '0%',
          right: '0%',
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          pointerEvents: 'none',
          alignItems: 'flex-end',
        }}
      >
        <Counter value={officials} suffix="+" label="Officials Trained" />
        <Counter value={institutions} suffix="+" label="Institutions" />
        <Counter value={statesCount} suffix="+" label="States & UTs" />
      </div>

      {/* Institutions panel — appears just above (or below) the hovered state */}
      <AnimatePresence>
        {hov && (
          <motion.div
            key={hov.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              ...panelPos,
              width: 'min(280px, 70vw)',
              padding: '14px 16px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(234,105,38,0.2)',
              boxShadow: '0 18px 44px rgba(16,24,40,0.2)',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, fontFamily: tokens.fonts.display, color: tokens.onSurface, letterSpacing: '-0.02em' }}>
                {hov.label}
              </h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(INSTITUTIONS[hov.id] || []).map((inst, k) => (
                <div key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: CAT_COLORS[inst.cat] || ORANGE, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: tokens.onSurface, lineHeight: 1.3 }}>{inst.name}</div>
                    <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: CAT_COLORS[inst.cat] || ORANGE }}>{inst.cat}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Counter({ value, suffix, label }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 6,
        padding: '5px 11px',
        borderRadius: 10,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(234,105,38,0.16)',
        boxShadow: '0 6px 18px rgba(16,24,40,0.08)',
      }}
    >
      <span
        style={{
          fontSize: 17,
          fontWeight: 800,
          fontFamily: tokens.fonts.display,
          background: 'linear-gradient(135deg, #ea6926, #ff8c42)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
          minWidth: 34,
        }}
      >
        {value}{suffix}
      </span>
      <span style={{ fontSize: 9.5, fontWeight: 600, color: tokens.secondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </span>
    </div>
  );
}
