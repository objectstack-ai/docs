import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { i18n } from '@/lib/i18n';

export default async function HomePage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Parse the Accept-Language header and find the best match
  const preferredLang = getPreferredLanguage(acceptLanguage, i18n.languages);
  
  redirect(`/${preferredLang}/docs`);
}

function getPreferredLanguage(acceptLanguage: string, availableLanguages: readonly string[]): string {
  // Parse Accept-Language header (e.g., "zh-CN,zh;q=0.9,en;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const parts = lang.trim().split(';');
      const code = parts[0].trim();
      
      // Skip empty language codes
      if (!code) {
        return null;
      }
      
      // Parse quality value, default to 1.0 if not present or invalid
      let quality = 1.0;
      if (parts[1]) {
        const qPart = parts[1].trim();
        if (qPart.startsWith('q=')) {
          const parsedQuality = parseFloat(qPart.substring(2));
          if (!isNaN(parsedQuality)) {
            quality = parsedQuality;
          }
        }
      }
      
      return { code, quality };
    })
    .filter((lang): lang is { code: string; quality: number } => lang !== null)
    .sort((a, b) => b.quality - a.quality);

  // Try to find the best match (exact or partial) respecting quality order
  for (const lang of languages) {
    // Try exact match first
    if (availableLanguages.includes(lang.code)) {
      return lang.code;
    }
    
    // Try partial match (e.g., "zh" matches "zh-CN")
    const langPrefix = lang.code.split('-')[0].toLowerCase();
    const match = availableLanguages.find(available => 
      available.toLowerCase().startsWith(langPrefix)
    );
    if (match) {
      return match;
    }
  }

  // Default to the configured default language
  return i18n.defaultLanguage;
}
