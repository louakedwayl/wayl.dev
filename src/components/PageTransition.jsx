import { useState, useEffect } from "react";

export default function PageTransition({ children, pageKey }) {
  const [v, setV] = useState(false);
  useEffect(() => { setV(false); const t = requestAnimationFrame(() => requestAnimationFrame(() => setV(true))); return () => cancelAnimationFrame(t); }, [pageKey]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>{children}</div>;
}
