import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { siteConfig } from './lib/site-config';
import path from 'node:path';
import fs from 'node:fs';
import remarkDirective from 'remark-directive';
import { remarkDirectiveAdmonition } from 'fumadocs-core/mdx-plugins';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { transformerTwoslash } from 'fumadocs-twoslash';

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
    remarkPlugins: [
      remarkDirective,
      remarkDirectiveAdmonition,
      remarkGfm,        // GitHub Flavored Markdown (tables, strikethrough, etc.)
      remarkMath,       // Math support (LaTeX equations)
    ],
    rehypePlugins: [
      rehypeKatex,      // Render math equations
    ],
    rehypeCodeOptions: {
      theme: siteConfig.content.codeBlock.theme,
      transformers: [
        transformerTwoslash(), // Interactive TypeScript code examples
      ],
    }
  }
});

