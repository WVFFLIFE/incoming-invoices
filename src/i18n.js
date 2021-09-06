import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import EN from './locales/en.json';
import FI from './locales/fi.json';

/* eslint-disable */
let lng = top?.window?.USER_LANGUAGE_CODE === 1035
  ? 'fi'
  : top?.window?.USER_LANGUAGE_CODE === 1033
  ? 'en'
  : 'en';
/* eslint-enable */

/* delete comment to change language (dev only)  */

if (process.env.NODE_ENV === 'development') {
  window.setLanguage = (l) => i18n.changeLanguage(l);
}

const resources = {
  en: {
    translation: EN
  },
  fi: {
    translation: FI
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng,
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n;