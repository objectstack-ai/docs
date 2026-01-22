import { apiSource$ } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { siteConfig } from '@/lib/site-config';

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
      tree={apiSource$.getPageTree(lang)}
      {...baseOptions}
      sidebar={{
        enabled: siteConfig.layout.sidebar.enabled,
        prefetch: siteConfig.layout.sidebar.prefetch,
        collapsible: siteConfig.layout.sidebar.collapsible,
        defaultOpenLevel: siteConfig.layout.sidebar.defaultOpenLevel,
        footer: siteConfig.layout.sidebar.footer ? (
           <div className="p-4 text-xs text-muted-foreground border-t">
             {siteConfig.layout.sidebar.footer.html ? (
                <div dangerouslySetInnerHTML={{ __html: siteConfig.layout.sidebar.footer.html }} />
             ) : (
                siteConfig.layout.sidebar.footer.text
             )}
           </div>
        ) : undefined,
        tabs: siteConfig.layout.sidebar.tabs && siteConfig.layout.sidebar.tabs.length > 0 ? 
          siteConfig.layout.sidebar.tabs.map(tab => ({
            title: tab.title,
            url: tab.url,
            description: tab.description,
          })) : undefined,
        banner: siteConfig.layout.sidebar.banner ? (
          <div className="-mx-2 -mt-2 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50 text-card-foreground text-sm">
            <a href={siteConfig.layout.sidebar.banner.url} className="block font-medium">
              {siteConfig.layout.sidebar.banner.text}
            </a>
          </div>
        ) : undefined
      }}
    >
      {children}
    </DocsLayout>
  );
}
