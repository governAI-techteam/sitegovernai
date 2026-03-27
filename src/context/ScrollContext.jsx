"use client";

import { createContext, useContext, useCallback } from "react";

const ScrollCtx = createContext(null);

export const useScroll = () => useContext(ScrollCtx);

export function ScrollProvider({ sectionRefs, children }) {
  const scrollTo = useCallback(
    (id) => {
      const el = sectionRefs.current[id];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [sectionRefs]
  );
  return <ScrollCtx.Provider value={scrollTo}>{children}</ScrollCtx.Provider>;
}
