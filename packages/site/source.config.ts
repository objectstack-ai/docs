import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { siteConfig } from './lib/site-config';
import path from 'node:path';
import fs from 'node:fs';

function resolveContentDir(dir: string) {
  if (process.env.DOCS_DIR && dir === 'content/docs') return process.env.DOCS_DIR;

  // Try local first (Root deployment)
  if (fs.existsSync(path.resolve(dir))) return dir;
  
  // Try parent (Monorepo/Vercel deployment where CWD is packages/site)
  const parentDir = path.join('../..', dir);
  if (fs.existsSync(path.resolve(parentDir))) return parentDir;

  return dir;
}

const docsDir = resolveContentDir('content/docs');

export const { docs, meta } = defineDocs({
  dir: docsDir,
});

export default defineConfig({
  mdxOptions: {
    // Rehype Code Plugin - Syntax highlighting configuration
    rehypeCodeOptions: {
      themes: {
        light: siteConfig.content.codeBlock.theme,
        dark: siteConfig.content.codeBlock.theme,
      },
      // Enable inline code highlighting with tailing curly colon syntax
      // Example: `code{:js}` will highlight as JavaScript
      inline: 'tailing-curly-colon',
      // Filter meta string before processing (optional customization)
      filterMetaString: (meta) => meta,
      // Enable tab support for code blocks
      tab: true,
    },
    // Remark Image Plugin - Image handling and optimization
    remarkImageOptions: {
      // Enable image optimization
      // This plugin handles images and makes them compatible with Next.js
      publicDir: 'public',
      placeholder: 'blur',
    },
    // Remark Heading Plugin - Table of contents and heading processing
    remarkHeadingOptions: {
      // Configure heading processing for TOC
      // This is used by fumadocs to generate the table of contents
    },
    // Remark Structure Plugin - Document structure extraction
    remarkStructureOptions: {
      // Extract structured data for search and navigation
      // This plugin analyzes document structure for features like search
    },
    // Remark Code Tab Plugin - Code tabs for switching between examples
    remarkCodeTabOptions: {
      // Use Tabs component for code tabs
      Tabs: 'Tabs',
      // Parse MDX in tab values
      parseMdx: false,
    },
    // Remark NPM Plugin - Package manager command tabs
    remarkNpmOptions: {
      // Persist tab selection across page navigation
      persist: {
        id: 'package-manager',
      },
    },
  }
});

