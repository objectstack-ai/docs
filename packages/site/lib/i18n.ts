import type { I18nConfig } from 'fumadocs-core/i18n';

export const i18n: I18nConfig<'en' | 'zh-CN'> = {
  defaultLanguage: 'en',
  languages: ['en', 'zh-CN'],
};

export type Locale = (typeof i18n.languages)[number];
