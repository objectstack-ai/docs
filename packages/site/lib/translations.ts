import { siteConfig } from './site-config';

/**
 * Translation strings for different languages
 * These are the UI strings used by fumadocs-ui
 */
interface LanguageTranslations {
  displayName: string;
  toc?: string;
  search?: string;
  lastUpdate?: string;
  searchNoResult?: string;
  previousPage?: string;
  nextPage?: string;
  chooseLanguage?: string;
}

/**
 * Default translations for supported languages
 * Add new language translations here as needed
 */
const defaultTranslations: Record<string, LanguageTranslations> = {
  en: {
    displayName: 'English',
  },
  cn: {
    displayName: '简体中文',
    toc: '目录',
    search: '搜索文档',
    lastUpdate: '最后更新于',
    searchNoResult: '没有结果',
    previousPage: '上一页',
    nextPage: '下一页',
    chooseLanguage: '选择语言',
  },
  ja: {
    displayName: '日本語',
    toc: '目次',
    search: 'ドキュメントを検索',
    lastUpdate: '最終更新',
    searchNoResult: '結果がありません',
    previousPage: '前のページ',
    nextPage: '次のページ',
    chooseLanguage: '言語を選択',
  },
  fr: {
    displayName: 'Français',
    toc: 'Table des matières',
    search: 'Rechercher dans la documentation',
    lastUpdate: 'Dernière mise à jour',
    searchNoResult: 'Aucun résultat',
    previousPage: 'Page précédente',
    nextPage: 'Page suivante',
    chooseLanguage: 'Choisir la langue',
  },
  de: {
    displayName: 'Deutsch',
    toc: 'Inhaltsverzeichnis',
    search: 'Dokumentation durchsuchen',
    lastUpdate: 'Zuletzt aktualisiert',
    searchNoResult: 'Keine Ergebnisse',
    previousPage: 'Vorherige Seite',
    nextPage: 'Nächste Seite',
    chooseLanguage: 'Sprache wählen',
  },
  es: {
    displayName: 'Español',
    toc: 'Tabla de contenidos',
    search: 'Buscar documentación',
    lastUpdate: 'Última actualización',
    searchNoResult: 'Sin resultados',
    previousPage: 'Página anterior',
    nextPage: 'Página siguiente',
    chooseLanguage: 'Elegir idioma',
  },
};

/**
 * Get translations for configured languages
 * Returns only the translations for languages specified in docs.site.json
 */
export function getTranslations(): Record<string, LanguageTranslations> {
  const configuredLanguages = siteConfig.i18n.languages;
  const translations: Record<string, LanguageTranslations> = {};

  for (const lang of configuredLanguages) {
    if (defaultTranslations[lang]) {
      translations[lang] = defaultTranslations[lang];
    } else {
      // If no translation exists for a configured language, provide a minimal fallback
      console.warn(`Warning: No translations found for language "${lang}". Using minimal fallback.`);
      translations[lang] = {
        displayName: lang.toUpperCase(),
      };
    }
  }

  return translations;
}
