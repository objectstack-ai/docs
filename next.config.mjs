// Dynamic Import Proxy for Vercel
// This allows Vercel to see a valid Next.js config in the root
// while the actual logic lives in packages/site

import siteConfig from './packages/site/next.config.mjs';

// We need to re-export the default export from the site config
// Note: Depending on how site/next.config.mjs exports, this might need adjustment.
// If site config exports a function (like withMDX(config)), it's an object/function.

export default siteConfig;
