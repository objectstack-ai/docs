import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  
  return (
    <DocsLayout
      tree={source.getPageTree(lang)}
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  );
}
