export type LanguageProviderProps = {
  children: React.ReactNode;
  initLocale: string;
  language?: string | null;
  setLanguage: (lang: string) => void;
};
