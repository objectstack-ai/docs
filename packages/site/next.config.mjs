import { createMDX } from 'fumadocs-mdx/next';
import path from 'path';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  images: { unoptimized: true },
};

export default withMDX(nextConfig);
