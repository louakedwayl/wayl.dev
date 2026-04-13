import { useLang } from "../context/lang";
import { i18n } from "../i18n";

export function useT() {
  const lang = useLang();
  return i18n[lang] || i18n.en;
}
