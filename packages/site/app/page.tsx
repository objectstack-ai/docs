import { redirect } from 'next/navigation';

/**
 * Root page - redirects are handled by proxy.ts middleware
 * This page should never actually render as the middleware intercepts and redirects
 * But Next.js requires a page component for the route to be recognized
 */
export default function RootPage() {
  // Fallback redirect if middleware didn't handle it
  redirect('/en/docs');
}
