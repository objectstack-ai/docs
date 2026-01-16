# @objectdocs/site

The Next.js application foundation for the ObjectStack documentation.

## Overview

This package provides the actual Next.js application structure, configuration, and UI components used to render the documentation. It is designed to be encapsulated and run via the `@objectdocs/cli`.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Documentation**: Fumadocs
- **Styling**: Tailwind CSS
- **Deployment**: Static Export (`output: 'export'`)

## Development

Typically you won't run this package directly. Instead, you should use the CLI from the root workspace:

```bash
pnpm dev
# or
pnpm objectdocs dev
```

However, for internal development of the site theme or logic, you can run:

```bash
cd packages/site
pnpm dev
```

## Structure

- `app/`: Next.js App Router pages and layouts.
- `lib/`: Utility functions (i18n, etc).
- `source.config.ts`: Fumadocs configuration.
- `next.config.mjs`: Next.js configuration (configured for static export).

## Build output

When built, the static assets are generated in the `out/` directory.
