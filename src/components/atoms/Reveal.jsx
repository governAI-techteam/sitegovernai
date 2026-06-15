'use client';

import { motion } from 'framer-motion';

/*
  Premium scroll-reveal wrapper. Fades + lifts content into view with a
  refined cubic-bezier easing. Supports optional blur-in and stagger.
*/
const EASE = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  y = 40,
  delay = 0,
  duration = 0.8,
  blur = true,
  once = true,
  amount = 0.2,
  className = '',
  style = {},
  as = 'div',
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* Container that staggers its direct Reveal/RevealItem children. */
export function RevealGroup({
  children,
  stagger = 0.12,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  className = '',
  style = {},
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, y = 36, duration = 0.7, className = '', style = {} }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(6px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
