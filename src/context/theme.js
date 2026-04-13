import { createContext, useContext } from "react";

export const ThemeContext = createContext();

export const themes = {
  dark: {
    bg: "#0a0a0a", surface: "#111", text: "#fff", textMuted: "#888", textFaint: "#555",
    textGhost: "#333", border: "rgba(255,255,255,0.08)", borderHover: "rgba(255,255,255,0.25)",
    accent: "#fff", btnBg: "#fff", btnText: "#0a0a0a", btnHover: "#ddd", cardBg: "#151515",
    gridLine: "rgba(255,255,255,0.02)", navBg: "rgba(10,10,10,0.95)", overlay: "rgba(0,0,0,0.8)",
    imgFilter: "brightness(0.5) grayscale(0.3)", imgFilterHover: "brightness(0.7)",
    selection: "rgba(255,255,255,0.15)", scrollThumb: "#222",
    tagBorder: "rgba(255,255,255,0.08)", tagBorderHover: "rgba(255,255,255,0.2)", toggleIcon: "☾",
    dropBg: "#151515", dropBorder: "rgba(255,255,255,0.1)", dropHover: "#1a1a1a",
  },
  light: {
    bg: "#f5f5f0", surface: "#eaeae5", text: "#111", textMuted: "#555", textFaint: "#888",
    textGhost: "#bbb", border: "rgba(0,0,0,0.08)", borderHover: "rgba(0,0,0,0.25)",
    accent: "#111", btnBg: "#111", btnText: "#f5f5f0", btnHover: "#333", cardBg: "#eaeae5",
    gridLine: "rgba(0,0,0,0.03)", navBg: "rgba(245,245,240,0.95)", overlay: "rgba(0,0,0,0.6)",
    imgFilter: "brightness(0.85) grayscale(0.15)", imgFilterHover: "brightness(1)",
    selection: "rgba(0,0,0,0.1)", scrollThumb: "#ccc",
    tagBorder: "rgba(0,0,0,0.1)", tagBorderHover: "rgba(0,0,0,0.3)", toggleIcon: "☀",
    dropBg: "#fff", dropBorder: "rgba(0,0,0,0.1)", dropHover: "#f0f0eb",
  },
};

export function useTheme() { return useContext(ThemeContext); }
