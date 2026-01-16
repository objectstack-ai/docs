import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { siteConfig } from '@/lib/site-config';

export default async function HomePage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  
  let lang = siteConfig.i18n.defaultLanguage;

  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(item => {
      const [tag, qValue] = item.trim().split(';');
      return {
        tag: tag.toLowerCase(),
        q: qValue ? parseFloat(qValue.replace('q=', '')) : 1.0
      };
    }).sort((a, b) => b.q - a.q);

    for (const { tag } of languages) {
      if ((tag.startsWith('zh') || tag === 'cn') && siteConfig.i18n.languages.includes('cn')) {
        lang = 'cn';
        break;
      }
      
      const match = siteConfig.i18n.languages.find(l => tag === l || tag.startsWith(l + '-'));
      if (match) {
        lang = match;
        break;
      }
    }
  }

  redirect(`/${lang}/docs`);
}
