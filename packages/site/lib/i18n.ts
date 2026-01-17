import { siteConfig } from './site-config';
import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: siteConfig.i18n.defaultLanguage,
  languages: siteConfig.i18n.languages,
  parser: 'dot',  
});
