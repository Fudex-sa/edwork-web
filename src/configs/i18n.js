import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import en from '~helpers/locale/en.json';
import ar from '~helpers/locale/ar.json';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n.use(reactI18nextModule).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  debug: process.env.NODE_ENV !== 'production',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
});

export default i18n;
