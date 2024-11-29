// src/i18n/utils.ts
import en from './en.json';
import mg from './mg.json';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return 'en';
}

export function useTranslations(lang: keyof typeof ui | string) {
  return function t(key: string) {
    return key.split('.').reduce((o, i) => o[i], ui[lang]);
  }
}

const ui = {
  en,
  mg,
};