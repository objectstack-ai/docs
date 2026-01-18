import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { siteConfig } from '@/lib/site-config';

/**
 * Root page that redirects to the appropriate language version
 * Detects user's preferred language from Accept-Language header
 */
export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Get configured languages and default language from site config
  const availableLanguages = siteConfig.i18n.languages;
  const defaultLanguage = siteConfig.i18n.defaultLanguage;
  
  // Parse Accept-Language header to find the best match
  const preferredLanguage = detectPreferredLanguage(acceptLanguage, availableLanguages);
  
  // Redirect to the detected or default language
  const targetLanguage = preferredLanguage || defaultLanguage;
  redirect(`/${targetLanguage}/docs`);
}

/**
 * Detect preferred language from Accept-Language header
 * Returns the first available language that matches user preferences
 */
function detectPreferredLanguage(
  acceptLanguage: string,
  availableLanguages: string[]
): string | null {
  if (!acceptLanguage) {
    return null;
  }
  
  // Parse Accept-Language header
  // Example: "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7"
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, qValue] = lang.trim().split(';q=');
      const quality = qValue ? parseFloat(qValue) : 1.0;
      // Extract primary language code (e.g., "en" from "en-US")
      const primaryCode = code.split('-')[0].toLowerCase();
      return { code: primaryCode, quality };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by quality (preference)
  
  // Find first matching language that is available
  for (const { code } of languages) {
    // Check if the language code matches any available language
    if (availableLanguages.includes(code)) {
      return code;
    }
    // Special case: map 'zh' to 'cn'
    if (code === 'zh' && availableLanguages.includes('cn')) {
      return 'cn';
    }
  }
  
  return null;
}
