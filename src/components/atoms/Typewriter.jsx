"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Typewriter({ words, typingSpeed = 100, deletingSpeed = 60, pauseDuration = 2500 }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeoutId;

    if (!isDeleting && text.length < currentWord.length) {
      // Type next character
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, typingSpeed);
    } else if (isDeleting && text.length > 0) {
      // Delete next character
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && text.length === currentWord.length) {
      // Pause before deleting
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && text.length === 0) {
      // Switch to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        style={{
          display: "inline-block",
          width: "0.08em",
          height: "1em",
          backgroundColor: "currentColor",
          marginLeft: "4px",
          verticalAlign: "middle"
        }}
      />
    </span>
  );
}
