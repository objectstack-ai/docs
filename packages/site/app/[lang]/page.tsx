import { redirect, notFound } from 'next/navigation';
import { i18n } from '@/lib/i18n';

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang === 'docs') {
    redirect(`/${i18n.defaultLanguage}/docs`);
  }

  if (!i18n.languages.includes(lang as any)) {
    notFound(); 
  }

  redirect(`/${lang}/docs`);
}
