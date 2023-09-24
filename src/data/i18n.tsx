// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/* import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'; */
// Definiere eine Liste der verfügbaren Sprachen
const availableLanguages = ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'sv', 'ja', 'zh', 'ar', 'hi'];

// Wähle eine zufällige Sprache aus der Liste aus
const randomLanguage = availableLanguages[Math.floor(Math.random() * availableLanguages.length)];

i18n
/*   .use(Backend)
  .use(LanguageDetector) */
  .use(initReactI18next)
  .init({

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
    },
    lng: randomLanguage, // Standardmäßige Sprache
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;
