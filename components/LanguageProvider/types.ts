export type LanguageProviderProps = {
  children: React.ReactNode;
  initLocale: string;
  language?: string;
  setLanguage: (lang: string) => void;
  initNow: number;
};
