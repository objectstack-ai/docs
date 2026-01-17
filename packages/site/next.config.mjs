import { createMDX } from 'fumadocs-mdx/next';
import fs from 'node:fs';
import path from 'node:path';

const withMDX = createMDX();

let userConfig = {};
try {
  // Read from content/docs.site.json if it exists (CLI copies it to root of site package)
  const configPath = path.resolve(process.cwd(), 'docs.site.json');
  if (fs.existsSync(configPath)) {
    userConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
} catch (e) {
  // Ignore error
}

const baseUrl = userConfig.baseUrl || '/docs';
const baseUrlPath = baseUrl.startsWith('/') ? baseUrl : `/${baseUrl}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  images: { unoptimized: true },
  async rewrites() {
    if (baseUrlPath === '/docs') return [];
    
    if (baseUrlPath === '/') {
      return [
        {
          source: '/:lang/:path((?!docs|api|_next|static|favicon.ico).*)',
          destination: '/:lang/docs/:path*'
        }
      ];
    }
    
    return [
      {
        source: `${baseUrlPath}/:path*`,
        destination: '/docs/:path*'
      },
      {
        source: `/:lang${baseUrlPath}/:path*`,
        destination: '/:lang/docs/:path*'
      }
    ];
  },
};

export default withMDX(nextConfig);
