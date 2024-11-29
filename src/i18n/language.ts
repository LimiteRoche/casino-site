// src/i18n/language.ts

const LANGUAGE_KEY = 'preferredLanguage';

export function setLanguage(language: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_KEY, language);
  }
}

export function getLanguage(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LANGUAGE_KEY) || navigator.language.split('-')[0] || 'en'; 
  }
  return 'en';
}
