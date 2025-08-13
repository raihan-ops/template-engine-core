import en from '../locales/en/translation.json';
import es from '../locales/es/translation.json';

const resources = { en, es };

export function getServerTranslation(locale = 'en') {
  const dict = resources[locale] || resources['en'];
  return (key) => dict[key] || key;
} 