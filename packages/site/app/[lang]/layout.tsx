import { I18nProvider } from 'fumadocs-ui/contexts/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import type { ReactNode } from 'react';
import { i18n } from '@/lib/i18n';
import { cn } from '@/lib/i18n-ui';
import { siteConfig } from '@/lib/site-config';

const i18nConfig = defineI18nUI(i18n, {
  translations: Object.fromEntries(
    siteConfig.i18n.languages.map((lang) => [
      lang.code,
      {
        name: lang.name, // fumadocs-ui uses name or displayName? Let's check docs or types. Usually 'name' in newer versions or 'displayName'. 
        // Checking previous code: it used `displayName`.
        displayName: lang.name, 
        ...(lang.code === 'zh-CN' ? cn : {}),
      },
    ])
  ),
});

export default async function LangLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  const providerProps = i18nConfig.provider(lang);
  
  return <I18nProvider {...providerProps}>{children}</I18nProvider>;
}

export async function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
