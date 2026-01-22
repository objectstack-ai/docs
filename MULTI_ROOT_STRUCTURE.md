# Multi-Root Documentation Structure

This documentation site uses a **multi-root structure** powered by Fumadocs, allowing different documentation sections to be organized independently while providing seamless navigation between them.

## Overview

The site is organized into three independent documentation roots under the `/docs` path:

### 1. **Framework** (`/docs/framework`)
- **Purpose**: Core ObjectStack framework documentation
- **Content**: Complete technical specification for ObjectStack platform
- **Sections**: 
  - Concepts (Architecture, Core Values, Enterprise Patterns)
  - Creator Layer (SDK, CLI)
  - Governance Layer (Deployment)
  - Execution Layer (ObjectQL, ObjectUI, ObjectOS)
  - Specifications

### 2. **Guides** (`/docs/guides`)
- **Purpose**: Practical tutorials and step-by-step guides
- **Content**: How-to guides for building with ObjectStack
- **Planned Sections**:
  - Getting Started Tutorial
  - Building Your First Application
  - Advanced Patterns and Best Practices
  - Integration Guides
  - Migration Guides

### 3. **API** (`/docs/api`)
- **Purpose**: Complete API reference documentation
- **Content**: Detailed API documentation for all components
- **Planned Sections**:
  - ObjectQL API Reference
  - ObjectUI API Reference
  - ObjectOS API Reference
  - Protocol Specifications
  - SDK Documentation

## Directory Structure

```
content/
└── docs/               # All documentation under docs root
    ├── framework/      # Framework documentation
    │   ├── concepts/
    │   ├── creator-layer/
    │   ├── governance-layer/
    │   ├── execution-layer/
    │   └── specifications/
    ├── guides/         # Guides documentation
    │   └── index.mdx
    └── api/            # API documentation
        └── index.mdx

packages/site/
└── app/[lang]/
    └── docs/           # All routes under /docs
        ├── [[...slug]]     # Main docs route
        ├── framework/      # Framework route
        ├── guides/         # Guides route
        └── api/            # API route
```

## Technical Implementation

### Source Configuration

Each root has its own source loader defined in `packages/site/lib/source.ts`:

```typescript
// Framework source
export const frameworkSource$ = loader({
  baseUrl: '/docs/framework',
  source: { files: [...frameworkSource.files] },
  i18n,
});

// Guides source
export const guidesSource$ = loader({
  baseUrl: '/docs/guides',
  source: { files: [...guidesSource.files] },
  i18n,
});

// API source
export const apiSource$ = loader({
  baseUrl: '/docs/api',
  source: { files: [...apiSource.files] },
  i18n,
});
```

### Sidebar Tabs

The sidebar tabs enable navigation between roots. Configuration in `docs.site.json`:

```json
{
  "layout": {
    "sidebar": {
      "tabs": [
        {
          "title": "Framework",
          "url": "/docs/framework",
          "description": "ObjectStack Framework Documentation"
        },
        {
          "title": "Guides",
          "url": "/docs/guides",
          "description": "Practical guides and tutorials"
        },
        {
          "title": "API",
          "url": "/docs/api",
          "description": "Complete API reference"
        }
      ]
    }
  }
}
```

### Routes

Each root has its own Next.js App Router structure under `/docs`:

- `/[lang]/docs/framework/[[...slug]]/page.tsx` - Framework pages
- `/[lang]/docs/guides/[[...slug]]/page.tsx` - Guides pages
- `/[lang]/docs/api/[[...slug]]/page.tsx` - API pages

## Adding Content

### Adding to Framework

Add MDX files to `content/docs/framework/` and update the corresponding `meta.json` files.

### Adding to Guides

Add MDX files to `content/docs/guides/` and update `meta.json`.

### Adding to API

Add MDX files to `content/docs/api/` and update `meta.json`.

## Benefits

1. **Separation of Concerns**: Different documentation types are cleanly separated
2. **Independent Navigation**: Each root has its own navigation tree
3. **Scalability**: Easy to add new documentation roots in the future
4. **Maintainability**: Clear structure makes it easier to maintain large documentation sets
5. **User Experience**: Tab-based navigation provides intuitive switching between sections

## Migration Notes

- All documentation is now under the `/docs` root path
- Framework docs moved to `/docs/framework`
- Guides available at `/docs/guides`
- API reference at `/docs/api`
- Original docs content (concepts, creator-layer, etc.) remains at `/docs`

## Future Expansion

The multi-root structure can easily accommodate additional documentation sections:
- **Examples** - Code examples and demos at `/docs/examples`
- **Blog** - Technical blog posts at `/docs/blog`
- **Community** - Community guides at `/docs/community`
- **Changelog** - Version history at `/docs/changelog`
