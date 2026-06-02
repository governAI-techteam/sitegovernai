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
        background: 'linear-gradient(90deg, #ea6926 0%, #ff8c42 100%)',
        zIndex: 2000,
        boxShadow: '0 1px 8px rgba(234,105,38,0.45)',
      }}
    />
  );
}
