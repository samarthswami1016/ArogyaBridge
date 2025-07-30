import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from '../public/locales/en/translation.json';
import hiTranslation from '../public/locales/hi/translation.json';
import mrTranslation from '../public/locales/mr/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  hi: {
    translation: hiTranslation
  },
  mr: {
    translation: mrTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('arogyabridge-language') || 'hi', // Default to Hindi
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // React already does escaping
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;