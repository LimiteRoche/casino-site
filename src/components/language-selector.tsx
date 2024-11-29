// src/components/language-selector.tsx
import React from 'react';
import { useStore } from '@nanostores/react';
import { languageStore } from '@/stores/language-store';
import { setLanguage } from '@/i18n/language';

const LanguageSelector: React.FC = () => {
  const $language = useStore(languageStore);

  const toggleLanguage = () => {
    languageStore.set($language === 'en' ? 'mg' : 'en');
    setLanguage($language);
  };

  return (
    <button onClick={toggleLanguage} className="flex items-center space-x-2">
      <img 
        src={$language === 'en' ? "/flags/gb.svg" : "/flags/mg.svg"} 
        alt={$language === 'en' ? "English" : "Malagasy"} 
        className="w-6 h-4"
      />
      <span>{$language === 'en' ? 'EN' : 'MG'}</span>
    </button>
  );
};

export default LanguageSelector;