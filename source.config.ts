import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

export const { docs: docsZh, meta: metaZh } = defineDocs({
  dir: 'content/docs-zh',
});

export default defineConfig();
