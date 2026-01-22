# Multi-Root Documentation Structure

This documentation site uses a **multi-root structure** powered by Fumadocs, allowing different documentation sections to be organized independently while providing seamless navigation between them.

## Overview

The site is organized into three independent documentation roots:

### 1. **Framework** (`/framework`)
- **Purpose**: Core ObjectStack framework documentation
- **Content**: Complete technical specification for ObjectStack platform
- **Sections**: 
  - Concepts (Architecture, Core Values, Enterprise Patterns)
  - Creator Layer (SDK, CLI)
  - Governance Layer (Deployment)
  - Execution Layer (ObjectQL, ObjectUI, ObjectOS)
  - Specifications

### 2. **Guides** (`/guides`)
- **Purpose**: Practical tutorials and step-by-step guides
- **Content**: How-to guides for building with ObjectStack
- **Planned Sections**:
  - Getting Started Tutorial
  - Building Your First Application
  - Advanced Patterns and Best Practices
  - Integration Guides
  - Migration Guides

### 3. **API** (`/api`)
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
├── docs/           # Legacy docs (kept for backward compatibility)
├── framework/      # Framework documentation root
│   ├── concepts/
│   ├── creator-layer/
│   ├── governance-layer/
│   ├── execution-layer/
│   └── specifications/
├── guides/         # Guides documentation root
│   └── index.mdx
└── api/            # API documentation root
    └── index.mdx

packages/site/
└── app/[lang]/
    ├── docs/       # Legacy docs route
    ├── framework/  # Framework route
    ├── guides/     # Guides route
    └── api/        # API route
```

## Technical Implementation

### Source Configuration

Each root has its own source loader defined in `packages/site/lib/source.ts`:

```typescript
// Framework source
export const frameworkSource$ = loader({
  baseUrl: '/framework',
  source: { files: [...frameworkSource.files] },
  i18n,
});

// Guides source
export const guidesSource$ = loader({
  baseUrl: '/guides',
  source: { files: [...guidesSource.files] },
  i18n,
});

// API source
export const apiSource$ = loader({
  baseUrl: '/api',
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
          "url": "/framework",
          "description": "ObjectStack Framework Documentation"
        },
        {
          "title": "Guides",
          "url": "/guides",
          "description": "Practical guides and tutorials"
        },
        {
          "title": "API",
          "url": "/api",
          "description": "Complete API reference"
        }
      ]
    }
  }
}
```

### Routes

Each root has its own Next.js App Router structure:

- `/[lang]/framework/[[...slug]]/page.tsx` - Framework pages
- `/[lang]/guides/[[...slug]]/page.tsx` - Guides pages
- `/[lang]/api/[[...slug]]/page.tsx` - API pages

## Adding Content

### Adding to Framework

Add MDX files to `content/framework/` and update the corresponding `meta.json` files.

### Adding to Guides

Add MDX files to `content/guides/` and update `meta.json`.

### Adding to API

Add MDX files to `content/api/` and update `meta.json`.

## Benefits

1. **Separation of Concerns**: Different documentation types are cleanly separated
2. **Independent Navigation**: Each root has its own navigation tree
3. **Scalability**: Easy to add new documentation roots in the future
4. **Maintainability**: Clear structure makes it easier to maintain large documentation sets
5. **User Experience**: Tab-based navigation provides intuitive switching between sections

## Migration Notes

- The legacy `/docs` route is maintained for backward compatibility
- Existing documentation has been copied to `/framework`
- New content should be added to the appropriate root

## Future Expansion

The multi-root structure can easily accommodate additional documentation sections:
- **Examples** - Code examples and demos
- **Blog** - Technical blog posts and updates
- **Community** - Community guides and contributions
- **Changelog** - Version history and release notes
