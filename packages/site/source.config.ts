import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import path from 'path';

const docsDir = process.env.DOCS_DIR || 'content/docs';
const docsZhDir = process.env.DOCS_ZH_DIR || 'content/docs-zh-CN';

export const { docs, meta } = defineDocs({
  dir: docsDir,
});

export const { docs: docsZh, meta: metaZh } = defineDocs({
  dir: docsZhDir,
});

export default defineConfig();
