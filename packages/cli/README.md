# objectdocs/cli

Internal CLI tool for automating documentation workflows for ObjectStack.

## Features

- **AI Translation**: Automatically translate MDX documentation from English to Chinese using OpenAI models.
- **Smart Updates**: Can process specific files or bulk translate the entire documentation.

## Installation

This package is part of the monorepo workspace. Install dependencies from the root:

```bash
pnpm install
```

## Usage

### Site Management

The CLI can also be used to run the documentation site locally with a VitePress-like experience.

```bash
# Start Dev Server
# Usage: pnpm objectdocs dev [docs-directory]
pnpm objectdocs dev ./content/docs

# Build Static Site
# Usage: pnpm objectdocs build [docs-directory]
pnpm objectdocs build ./content/docs
```

### Translate Documentation

The `translate` command reads English documentation from `content/docs` and generates Chinese translations in `content/docs-zh-CN`.

**Prerequisites:**
You must set the following environment variables (in `.env` or your shell):

```bash
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1 # Optional
```

**Commands:**

```bash
# Translate a specific file
pnpm objectdocs translate content/docs/00-intro/index.mdx

# Translate multiple files
pnpm objectdocs translate content/docs/00-intro/index.mdx content/docs/01-quickstart/index.mdx

# Translate all files in content/docs
pnpm objectdocs translate --all

# Specify a custom model (default: gpt-4o)
pnpm objectdocs translate --all --model gpt-4-turbo
```

### CI/CD Integration

In CI environments, you can use the `CHANGED_FILES` environment variable to translate only modified files:

```bash
export CHANGED_FILES="content/docs/new-page.mdx"
pnpm objectdocs translate
```
