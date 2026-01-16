import { i18n } from '@/lib/i18n';
import { ClientRedirect } from '@/components/client-redirect';

export default function HomePage() {
  return (
    <ClientRedirect 
      availableLanguages={i18n.languages as string[]}
      defaultLanguage={i18n.defaultLanguage}
    />
  );
}

