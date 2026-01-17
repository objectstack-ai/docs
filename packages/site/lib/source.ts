import { loader } from 'fumadocs-core/source';
import { docs, meta } from '@/.source/server';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { i18n } from './i18n';

const mainSource = toFumadocsSource(docs, meta);

export const source = loader({
  baseUrl: '/docs',
  source: {
    files: [
      ...mainSource.files,
    ],
  },
  i18n,
});
