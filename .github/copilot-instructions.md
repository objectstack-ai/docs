# ObjectStack Documentation Copilot Instructions

You are an expert technical writer and software engineer working on the ObjectStack documentation project.
The project uses **Next.js (App Router)** and **Fumadocs**.

## Project Overview
- **Product**: ObjectStack (Low-code/Full-stack development platform).
- **Core Modules**: ObjectQL (Backend), ObjectUI (Frontend), ObjectOS (Runtime).
- **Tech Stack**: Next.js, React, Tailwind CSS, Fumadocs.
- **Package Manager**: pnpm.

## Content Guidelines

### File Structure
- Documentation source is located in `content/docs/`.
- Files follow the pattern: `filename.[lang].mdx`.
  - English: `*.en.mdx`
  - Chinese: `*.zh-CN.mdx`
- Sidebar navigation is defined in `meta.[lang].json` files within each directory.

### Frontmatter
Every MDX file MUST have a frontmatter block with `title` and `description`.
```yaml
---
title: Title of the Page
description: Short summary for search engines and preview cards
---
```

### Writing Style (MDX)
- **Headings**: Use `##` (H2) for major sections. `H1` is handled automatically by the page title.
- **Tone**: Professional, technical, concise, and direct.
- **Code Blocks**: Always specify the language for syntax highlighting (e.g., ```typescript, ```bash, ```json).
- **Callouts**: Use the standard Fumadocs callout syntax or components if strictly required, but prefer standard markdown where possible.

### Terminology
- **ObjectStack**: The platform name (PascalCase).
- **ObjectQL**: The database query engine.
- **ObjectUI**: The UI rendering engine.
- **ObjectOS**: The operating system/runtime.
- **Local-First**: A core philosophy of the project.
- **Protocol-Driven**: Key architectural concept.

## Development Guidelines

### Fumadocs & Next.js
- Use `fumadocs-ui` components for UI elements.
- When working on `app/` directory files, use **TypeScript**.
- Follow Next.js App Router conventions (`layout.tsx`, `page.tsx`).

### Internationalization (i18n)
- When generating content, be aware of the target language based on the file extension.
- `meta.en.json` defines the sidebar for English.
- `meta.zh-CN.json` defines the sidebar for Chinese.
- Ensure translations are accurate and use native terminology (e.g., "对象存储" vs "Object Storage", but for product names like ObjectQL, keep them in English).

## Task Specific Instructions

- **Translation Workflow**:
  - Always write the English documentation (`.en.mdx`) first.
  - Then translate the content to other languages (e.g., `.zh-CN.mdx`).

- **When creating a new page**:
  1. Create `filename.en.mdx` and `filename.zh-CN.mdx`.
  2. Add the filename (without extension) to the `pages` array in the corresponding `meta.[lang].json` files.
  
- **When editing content**:
  - Check if the change applies to both languages. If so, update both files to keep them in sync.

- **When explaining code**:
  - Provide context about where the code belongs (e.g., "In `source.config.ts`...").
