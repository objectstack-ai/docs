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
      const code = parts[0];
      const quality = parts[1] ? parseFloat(parts[1].split('=')[1]) : 1.0;
      return { code, quality };
    })
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
