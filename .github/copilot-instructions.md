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
- **English Documentation**: `content/docs/**/*.mdx` (The source of truth)
- **Navigation**: `meta.json` in each directory defines the sidebar structure.

### Frontmatter
Every MDX file MUST have a frontmatter block with `title` and `description`.
```yaml
---
title: Title of the Page
description: Short summary for search engines and preview cards
---
```

### Writing Style (MDX)
- **Headings**: Use `#` (H1) for the page title and `##` (H2) for major sections.
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
- `content/docs` is for English (default).

## Task Specific Instructions

- **Translation Workflow**:
  - Always write the English documentation in `content/docs/` first.

- **When creating a new page**:
  1. Create `filename.mdx` in `content/docs/`.
  2. Add the filename (without extension) to `meta.json`.
  
- **When editing content**:
  - Edit the file in `content/docs/`.

- **When explaining code**:
  - Provide context about where the code belongs (e.g., "In `source.config.ts`...").
