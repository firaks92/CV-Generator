const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? '/CV-Generator' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGitHubPages ? { output: 'export', trailingSlash: true } : {}),
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
