import { useTranslation } from 'react-i18next';

type Language = 'nl' | 'en' | 'fr';

export function useLanguage() {
  const { i18n } = useTranslation();

  const language = i18n.language as Language;
  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  return { language, setLanguage };
}
