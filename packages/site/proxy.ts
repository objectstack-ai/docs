import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';
import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';

// Create fumadocs middleware
const fumadocsMiddleware = createI18nMiddleware(i18n);

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname;
  
  // Handle root path - redirect to English docs
  if (path === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/en/docs';
    return NextResponse.redirect(url);
  }
  
  // For all other paths, pass through to fumadocs middleware
  return fumadocsMiddleware(request, event);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)'],
};
