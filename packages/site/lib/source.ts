import { loader } from 'fumadocs-core/source';
import { docs, meta } from '@/.source/server';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { i18n } from './i18n';
import { siteConfig } from './site-config';

const mainSource = toFumadocsSource(docs, meta);

export const source = loader({
  baseUrl: siteConfig.baseUrl,
  source: {
    files: [
      ...mainSource.files,
    ],
  },
  i18n,
});
