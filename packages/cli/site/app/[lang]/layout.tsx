import { I18nProvider } from 'fumadocs-ui/contexts/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import type { ReactNode } from 'react';
import { i18n } from '@/lib/i18n';
import { cn } from '@/lib/i18n-ui';

const translations = {
  'zh-CN': cn,
};

const i18nConfig = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English',
    },
    'zh-CN': {
      ...cn,
      displayName: '简体中文',
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
  const providerProps = i18nConfig.provider(lang);
  
  return <I18nProvider {...providerProps}>{children}</I18nProvider>;
}

export async function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
