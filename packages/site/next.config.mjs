import { createMDX } from 'fumadocs-mdx/next';
import fs from 'node:fs';
import path from 'node:path';

const withMDX = createMDX();

function getBuildConfig() {
  try {
    const configPath = path.resolve(process.cwd(), '../../objectdocs.json');
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, 'utf-8');
      const config = JSON.parse(content);
      return config.build || {};
    }
  } catch (e) {
    console.error('Error loading objectdocs.json in next.config.mjs:', e);
  }
  return {};
}

const buildConfig = getBuildConfig();
const isStaticExport = buildConfig.output === 'export';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: isStaticExport ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);
