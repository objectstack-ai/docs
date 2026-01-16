'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ClientRedirectProps {
  availableLanguages: string[];
  defaultLanguage: string;
}

export function LanguageRedirect({ availableLanguages, defaultLanguage }: ClientRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    let preferredLang = defaultLanguage;

    // Try to detect user language from browser
    if (typeof navigator !== 'undefined') {
      const userLangs = navigator.languages || [navigator.language];
      
      for (const lang of userLangs) {
        if (!lang) continue;
        
        // Exact match
        if (availableLanguages.includes(lang)) {
          preferredLang = lang;
          break;
        }

        // Prefix match (e.g. "zh" for "zh-CN")
        const match = availableLanguages.find(l => 
          l.split('-')[0].toLowerCase() === lang.split('-')[0].toLowerCase()
        );
        if (match) {
          preferredLang = match;
          break;
        }
      }
    }

    router.replace(`/${preferredLang}/docs`);
  }, [availableLanguages, defaultLanguage, router]);

  return null;
}