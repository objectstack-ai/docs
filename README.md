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
  - Source: English (`content/docs`)
  - Target: Chinese (`content/docs-zh-CN`) - *Auto-translated via AI*
- 📝 **MDX Content**: Interactive documentation with Type-safe components.
- 🛠️ **Automated Workflows**: 
  - AI Translation CLI (`packages/docs-cli`)
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
pnpm docs-cli translate --all
```


For a comprehensive guide on how to build and maintain multi-language documentation, see the [Multi-language Documentation Guide](content/docs/i18n-guide.en.mdx) available in the documentation:

- English: `/en/docs/i18n-guide`
- Chinese: `/zh-CN/docs/i18n-guide`

The guide covers:
- Configuration setup
- Creating multi-language content
- File naming conventions
- Adding new languages
- Troubleshooting common issues

## Configuration Notes

### Internationalization (i18n)

The default language is configured in `lib/i18n.ts` as `en`. If you change the default language, you must also update the redirect destination in `vercel.json` to match (currently `/en/docs`).

### Content Structure

Content files are located in `content/docs/` and use language suffixes:
- `{filename}.en.mdx` - English content
- `{filename}.zh-CN.mdx` - Chinese content
- `meta.en.json` - English navigation
- `meta.zh-CN.json` - Chinese navigation