import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { siteConfig } from './lib/site-config';
import path from 'node:path';
import fs from 'node:fs';

function resolveContentDir(dir: string) {
  if (process.env.DOCS_DIR && dir === 'content/docs') return process.env.DOCS_DIR;
  if (process.env.DOCS_ZH_DIR && dir === 'content/docs-zh-CN') return process.env.DOCS_ZH_DIR;

  // Try local first (Root deployment)
  if (fs.existsSync(path.resolve(dir))) return dir;
  
  // Try parent (Monorepo/Vercel deployment where CWD is packages/site)
  const parentDir = path.join('../..', dir);
  if (fs.existsSync(path.resolve(parentDir))) return parentDir;

  return dir;
}

const docsDir = resolveContentDir('content/docs');
const docsZhDir = resolveContentDir('content/docs-zh-CN');

export const { docs, meta } = defineDocs({
  dir: docsDir,
});

export const { docs: docsZh, meta: metaZh } = defineDocs({
  dir: docsZhDir,
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      theme: siteConfig.content.codeBlock.theme,
    }
  }
});

