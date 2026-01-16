import { i18n } from '@/lib/i18n';
import { LanguageRedirect } from '@/components/language-redirect';

export default function HomePage() {
  return (
    <LanguageRedirect 
      availableLanguages={i18n.languages as string[]}
      defaultLanguage={i18n.defaultLanguage}
    />
  );
}
