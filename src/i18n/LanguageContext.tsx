import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { translations, Language } from "./translations";

type I18nContextType = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = "enigma_lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && ["es", "en", "pt"].includes(saved)) {
      setLangState(saved);
      return;
    }
    // Try to infer from browser
    const nav = (navigator?.language || "es").slice(0, 2);
    const inferred = (nav === "en" ? "en" : nav === "pt" ? "pt" : "es") as Language;
    setLangState(inferred);
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  const t = useMemo(() => {
    return (key: string) => {
      const dict = translations[lang] || translations["es"];
      return dict[key] ?? translations["en"][key] ?? key;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
};

export const useLanguage = () => {
  const { lang, setLang } = useI18n();
  return { lang, setLang };
};

export const useTranslation = () => {
  const { t } = useI18n();
  return { t };
};

