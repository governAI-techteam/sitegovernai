'use client';

import { motion } from 'framer-motion';

export function FadeIn({
  children,
  delay = 0,
  yOffset = 30,
  duration = 0.7,
  className = '',
  style = {},
  stagger = false,
  staggerDelay = 0.1,
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: yOffset,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1], // Premium cubic-bezier easing
      },
    },
  };

  if (stagger) {
    return (
      <motion.div
        className={className}
        style={style}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: yOffset, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// New SlideIn Component for horizontal animations
export function SlideIn({
  children,
  delay = 0,
  direction = 'left', // 'left', 'right', 'up', 'down'
  duration = 0.7,
  className = '',
  style = {},
}) {
  const directions = {
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    up: { x: 0, y: 60 },
    down: { x: 0, y: -60 },
  };

  const offset = directions[direction];

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ScaleIn Component for zoom animations
export function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  style = {},
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
      }}
    >
      {children}
    </motion.div>
  );
}
