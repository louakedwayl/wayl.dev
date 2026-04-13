import { useTheme } from "../context/theme";
import { useT } from "../hooks/useT";

export default function Footer() {
  const t = useTheme();
  const tx = useT();
  return (
    <footer style={{ padding: "40px clamp(24px,5vw,80px)", borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontFamily: "'DM Sans',Helvetica,sans-serif", fontSize: 11, color: t.textGhost, letterSpacing: "0.05em" }}>{tx.footer}</div>
    </footer>
  );
}
