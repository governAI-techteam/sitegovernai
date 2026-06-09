'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/*
  Slim gradient progress bar fixed to the very top of the viewport.
  Reflects overall page scroll — a subtle, premium "you are here" cue.
*/
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        transformOrigin: '0%',
        scaleX,
        background: 'linear-gradient(90deg, #f16a24 0%, #f16a24 100%)',
        zIndex: 2000,
        boxShadow: '0 1px 8px rgba(241,106,36,0.45)',
      }}
    />
  );
}
