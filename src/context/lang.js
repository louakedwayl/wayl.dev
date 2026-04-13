import { createContext, useContext } from "react";

export const LangContext = createContext();

export const LANGS = {
  en: { code: "en", label: "EN", flag: "🇬🇧", dir: "ltr" },
  ru: { code: "ru", label: "RU", flag: "🇷🇺", dir: "ltr" },
  ar: { code: "ar", label: "AR", flag: "🇸🇦", dir: "rtl" },
  zh: { code: "zh", label: "ZH", flag: "🇨🇳", dir: "ltr" },
  fr: { code: "fr", label: "FR", flag: "🇫🇷", dir: "ltr" },
  ja: { code: "ja", label: "JA", flag: "🇯🇵", dir: "ltr" },
  es: { code: "es", label: "ES", flag: "🇪🇸", dir: "ltr" },
  it: { code: "it", label: "IT", flag: "🇮🇹", dir: "ltr" },
  nl: { code: "nl", label: "NL", flag: "🇳🇱", dir: "ltr" },
};

export function useLang() { return useContext(LangContext); }
