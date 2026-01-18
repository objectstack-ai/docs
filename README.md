# ObjectStack Documentation

The official documentation for ObjectStack, built with Next.js (App Router) and [Fumadocs](https://fumadocs.vercel.app).

## Project Structure

This repository contains the documentation for:
- **ObjectStack Platform**: The core development platform.
- **ObjectQL**: The backend data protocol engine.
- **ObjectUI**: The declarative UI engine.
- **ObjectOS**: The runtime operating system.

## Features

- 🌍 **Multi-language Support**: 
  - Configurable via `docs.site.json`
  - Built-in support for: English, Chinese, Japanese, French, German, Spanish
  - Extensible: Easy to add new languages
  - Auto-translation via AI CLI using dot parser convention
- 📝 **MDX Content**: Interactive documentation with Type-safe components.
- 🛠️ **Automated Workflows**: 
  - AI Translation CLI (`packages/cli`)
  - Broken link checking
  - SEO optimization

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm run dev
```

Visit `http://localhost:3000` to view the documentation.

## Writing Documentation

1. Create new MDX files in `content/docs`.
2. Update `meta.json` in the corresponding directory.
3. Commit your changes (CI will handle translation).

### CLI Tools

We provide a custom CLI for translation tasks:

```bash
# Translate all files
pnpm objectdocs translate --all
```


For a comprehensive guide on how to build and maintain multi-language documentation, see the [Multi-language Documentation Guide](content/docs/i18n-guide.en.mdx) available in the documentation:

- English: `/en/docs/i18n-guide`
- Chinese: `/cn/docs/i18n-guide`

The guide covers:
- Configuration setup
- Creating multi-language content
- File naming conventions
- Adding new languages
- Troubleshooting common issues

## Configuration Notes

### Internationalization (i18n)

Language configuration is managed in `content/docs.site.json`:

```json
{
  "i18n": {
    "enabled": true,
    "defaultLanguage": "en",
    "languages": ["en", "cn"]
  }
}
```

**Configurable Options:**
- `enabled`: Enable/disable i18n support
- `defaultLanguage`: The default language for the site (e.g., "en")
- `languages`: Array of supported language codes (e.g., ["en", "cn", "ja", "fr"])

**Supported Languages:**
The system includes built-in UI translations for:
- `en` - English
- `cn` - Chinese (Simplified) / 简体中文
- `ja` - Japanese / 日本語
- `fr` - French / Français
- `de` - German / Deutsch
- `es` - Spanish / Español

To add a new language:
1. Add the language code to the `languages` array in `docs.site.json`
2. If UI translations don't exist, add them to `packages/site/lib/translations.ts`
3. Create content files with the language suffix (e.g., `file.{lang}.mdx`)

**Important:** If you change the default language, you must also update the redirect destination in `vercel.json` to match (currently `/en/docs`).

### Content Structure

Content files are located in `content/docs/` and use language suffixes based on the `languages` configuration:
- `{filename}.{lang}.mdx` - Language-specific content (e.g., `index.en.mdx`, `index.cn.mdx`)
- `meta.{lang}.json` - Language-specific navigation (e.g., `meta.en.json`, `meta.cn.json`)

The CLI translate utility automatically generates language suffixes based on your configuration.