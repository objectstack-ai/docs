# docs

A multi-language documentation site built with Fumadocs, supporting English and Chinese.

## Features

- 🌍 **Multi-language Support**: Full internationalization with English (en) and Chinese (zh-CN)
- 📝 **MDX Content**: Write documentation using MDX for interactive content
- 🔍 **Fast Search**: Quick search across all documentation
- 🎨 **Modern UI**: Beautiful and responsive design with Fumadocs UI
- 📱 **Mobile Friendly**: Fully responsive on all devices

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to view the documentation site.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Building Multi-language Documentation

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