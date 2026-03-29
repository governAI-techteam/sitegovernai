"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { tokens } from "@/theme/tokens";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure scroll is locked during loading, then restore it
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 1800);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: tokens.surface,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.img
            src="/assets/img/logo.png"
            alt="GovernAI Loading"
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ width: "100%", maxWidth: "300px", height: "auto" }}
          />
          {/* Subtle loading pulse bar below logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ 
              marginTop: "40px", 
              width: "40px", 
              height: "2px", 
              background: tokens.primary, 
              borderRadius: "2px",
              overflow: "hidden" 
            }}>
             <motion.div 
                animate={{ x: ["-100%", "100%"] }} 
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.8)" }} 
             />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
