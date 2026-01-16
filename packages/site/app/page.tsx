'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { i18n } from '@/lib/i18n';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Get available languages from config
    const availableLanguages = i18n.languages as readonly string[];
    let preferredLang = i18n.defaultLanguage;

    // Try to detect user language from browser
    if (typeof navigator !== 'undefined') {
      const userLangs = navigator.languages || [navigator.language];
      
      for (const lang of userLangs) {
        if (!lang) continue;
        
        // Exact match
        if (availableLanguages.includes(lang)) {
          preferredLang = lang as any;
          break;
        }

        // Prefix match (e.g. "zh" for "zh-CN")
        const prefix = lang.split('-')[0].toLowerCase();
        const match = availableLanguages.find(l => 
          l.toLowerCase().startsWith(prefix)
        );
        
        if (match) {
          preferredLang = match as any;
          break;
        }
      }
    }

    router.replace(`/${preferredLang}/docs`);
  }, [router]);

  return null; // Render nothing while redirecting
}
