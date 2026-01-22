import { loader } from 'fumadocs-core/source';
import { 
  docs, 
  meta, 
  frameworkDocs, 
  frameworkMeta,
  guidesDocs,
  guidesMeta,
  apiDocs,
  apiMeta,
} from '@/.source/server';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { i18n } from './i18n';

// Legacy docs source (kept for backward compatibility)
const mainSource = toFumadocsSource(docs, meta);

// Multi-root sources
const frameworkSource = toFumadocsSource(frameworkDocs, frameworkMeta);
const guidesSource = toFumadocsSource(guidesDocs, guidesMeta);
const apiSource = toFumadocsSource(apiDocs, apiMeta);

// Legacy single-root source (currently points to docs directory)
export const source = loader({
  baseUrl: '/docs',
  source: {
    files: [
      ...mainSource.files,
    ],
  },
  i18n,
});

// Multi-root sources as subdirectories under /docs
export const frameworkSource$ = loader({
  baseUrl: '/docs/framework',
  source: {
    files: [
      ...frameworkSource.files,
    ],
  },
  i18n,
});

export const guidesSource$ = loader({
  baseUrl: '/docs/guides',
  source: {
    files: [
      ...guidesSource.files,
    ],
  },
  i18n,
});

export const apiSource$ = loader({
  baseUrl: '/docs/api',
  source: {
    files: [
      ...apiSource.files,
    ],
  },
  i18n,
});
