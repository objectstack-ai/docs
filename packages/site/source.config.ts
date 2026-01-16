import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { siteConfig } from './lib/site-config';

const docsDir = process.env.DOCS_DIR || 'content/docs';
const docsZhDir = process.env.DOCS_ZH_DIR || 'content/docs-zh-CN';

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

