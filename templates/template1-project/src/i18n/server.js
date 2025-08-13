import en from '../locales/en/translation.json';
import es from '../locales/es/translation.json';
const resources = { en, es };

export async function getT(locale = 'en') {
  const dict = resources[locale] || resources['en'];
  // Minimal i18next-like interpolation
  function t(key, options = {}) {
    let str = dict[key] || key;
    for (const [k, v] of Object.entries(options)) {
      str = str.replace(new RegExp(`{{\s*${k}\s*}}`, 'g'), v);
    }
    return str;
  }
  return t;
} 