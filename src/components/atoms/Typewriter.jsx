'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 2500,
}) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Find the longest word to reserve space and prevent layout shift
  const longestWord = useMemo(
    () => words.reduce((a, b) => (a.length >= b.length ? a : b), ''),
    [words]
  );

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeoutId;

    if (!isDeleting && text.length < currentWord.length) {
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, typingSpeed);
    } else if (isDeleting && text.length > 0) {
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && text.length === currentWord.length) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && text.length === 0) {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 0);
    }

    return () => clearTimeout(timeoutId);
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      {/* Invisible spacer that reserves width of the longest word */}
      <span
        aria-hidden="true"
        style={{
          visibility: 'hidden',
          whiteSpace: 'pre',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {longestWord}
      </span>
      {/* Visible text absolutely positioned on top */}
      <span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          whiteSpace: 'nowrap',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <span>{text}</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
          style={{
            display: 'inline-block',
            width: '0.08em',
            height: '1em',
            backgroundColor: 'currentColor',
            marginLeft: '4px',
            verticalAlign: 'middle',
          }}
        />
      </span>
    </span>
  );
}
