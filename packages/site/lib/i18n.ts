import type { I18nConfig } from 'fumadocs-core/i18n';
import { siteConfig } from './site-config';

export const i18n: I18nConfig = {
  defaultLanguage: siteConfig.i18n.defaultLanguage,
  languages: siteConfig.i18n.languages.map((lang) => lang.code),
};

export type Locale = string;

