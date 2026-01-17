import { redirect, notFound } from 'next/navigation';
import { source } from '@/lib/source';
import { siteConfig } from '@/lib/site-config';

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // If baseUrl is custom (e.g. /guides), redirect there.
  // If baseUrl is /docs (default), redirect there.
  // If baseUrl is / (root), then this page ITSELF might be conflicting with the docs root page if structure allows.
  
  const baseUrl = siteConfig.baseUrl || '/docs';
  
  if (baseUrl === '/') {
     // If base url is root, we redirect to 'index' to avoid loop with this page (which handles /lang).
     // The rewrite rule in next.config.mjs will then map /lang/index -> /lang/docs/index
     redirect(`/${lang}/index`); 
  }

  // Remove leading slash for cleaner string concat if needed, but keeping it simple:
  // cleanBaseUrl = baseUrl.startsWith('/') ? baseUrl : '/' + baseUrl
  
  redirect(`/${lang}${baseUrl}`);
}