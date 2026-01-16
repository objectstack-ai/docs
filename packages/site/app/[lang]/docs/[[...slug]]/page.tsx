import { source } from '@/lib/source';
import type { Metadata } from 'next';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/site-config';

interface PageProps {
  params: Promise<{
    lang: string;
    slug?: string[];
  }>;
}

export default async function Page({ params }: PageProps) {
  const { lang, slug = [] } = await params;
  
  const page = source.getPage(slug, lang);
  
  if (!page) {
    notFound();
  }

  const MDX = page.data.body as any;

  return (
    <DocsPage 
      toc={page.data.toc as any} 
      full={page.data.full as any}
      lastUpdate={siteConfig.page.showLastUpdate ? (page.data as any).lastModified : undefined}
      tableOfContent={{
        enabled: siteConfig.layout.toc.enabled,
        style: siteConfig.layout.toc.depth > 2 ? 'clerk' : 'normal',
      }}
      editOnGithub={siteConfig.page.showEditLink ? {
        owner: siteConfig.page.repoBaseUrl.split('/')[3],
        repo: siteConfig.page.repoBaseUrl.split('/')[4],
        sha: 'main', // Defaulting to main, could be extracted
        path: siteConfig.page.repoBaseUrl.split('/').slice(7).join('/') // simplistic parsing
      } : undefined}
    >
      <DocsBody>
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}


export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug = [] } = await params;
  const page = source.getPage(slug, lang);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
