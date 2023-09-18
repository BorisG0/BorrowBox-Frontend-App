// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome',
      },
    },
    de: {
      translation: {
        welcome: 'Willkommen',
      },
    },
    // Fügen Sie hier weitere Sprachen hinzu
    fr: {
      translation: {
        welcome: 'Bienvenue',
      },
    },
    es: {
      translation: {
        welcome: 'Bienvenido',
      },
    },
    it: {
      translation: {
        welcome: 'Benvenuto',
      },
    },
    nl: {
      translation: {
        welcome: 'Welkom',
      },
    },
    pt: {
      translation: {
        welcome: 'Bem-vindo',
      },
    },
    sv: {
      translation: {
        welcome: 'Välkommen',
      },
    },
    ru: {
      translation: {
        welcome: 'Добро пожаловать',
      },
    },
    ja: {
      translation: {
        welcome: 'ようこそ',
      },
    },
    zh: {
      translation: {
        welcome: '欢迎',
      },
    },
    ar: {
      translation: {
        welcome: 'مرحبًا',
      },
    },
    hi: {
      translation: {
        welcome: 'स्वागत है',
      },
    },
    ko: {
      translation: {
        welcome: '어서 오십시오',
      },
    },
  },
  lng: 'en', // Standardmäßige Sprache
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
