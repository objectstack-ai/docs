import { redirect, notFound } from 'next/navigation';


export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  redirect(`/${lang}/docs`);
}