import { RootProvider } from 'fumadocs-ui/provider/next';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import type { ReactNode } from 'react';
import { i18n } from '@/lib/i18n';
import { cn } from '@/lib/i18n-ui';
import { siteConfig } from '@/lib/site-config';


const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English',
    },
    cn: {
      displayName: 'Chinese',
    },
  },
});

export default async function LangLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  
  return  <RootProvider i18n={provider(lang)}>{children}</RootProvider>;

}

export async function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
