import { loader } from 'fumadocs-core/source';
import { docs, meta, docsZh, metaZh } from '@/.source/server';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { i18n } from './i18n';

const mainSource = toFumadocsSource(docs, meta);
const zhSource = toFumadocsSource(docsZh, metaZh);

export const source = loader({
  baseUrl: '/docs',
  source: {
    files: [
      ...mainSource.files,
      ...zhSource.files.map((file) => ({
        ...file,
        locale: 'zh-CN',
      })),
    ],
  },
  i18n,
});
